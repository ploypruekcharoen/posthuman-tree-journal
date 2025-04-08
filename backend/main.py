import base64
from io import BytesIO
import time

from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types
from PIL import Image
from pydantic import BaseModel
from loguru import logger

from openai import OpenAI
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ImageGenerationResponse(BaseModel):
    description: str
    image_data: str


@app.post("/generate_image", response_model=ImageGenerationResponse)
async def generate_image(
    file: str = Form(...),
    description: str = Form(""),
) -> ImageGenerationResponse:
    client = OpenAI()

    image_bytes = base64.b64decode(file)

    image = Image.open(BytesIO(image_bytes))

    if image.mode != "RGBA":
        image = image.convert("RGBA")

    img_buffer = BytesIO()
    image.save(img_buffer, format="PNG", optimize=True)

    if img_buffer.tell() > 4 * 1024 * 1024:
        width, height = image.size
        ratio = min(1.0, (4 * 1024 * 1024) / img_buffer.tell())
        new_size = (int(width * ratio**0.5), int(height * ratio**0.5))
        image = image.resize(new_size, Image.LANCZOS)

        img_buffer = BytesIO()
        image.save(img_buffer, format="PNG", optimize=True)

    img_buffer.seek(0)
    image_bytes = img_buffer.getvalue()

    text_input = f"Description: {description}\n\n" if description != "" else ""
    text_input += "Here is a picture of the tree that I took. Recreate this image in a posthuman style. By posthuman, I mean a philosophical concept that explores what the world is and what it could look like if humans weren't the central characters. After generating the image, WRITE A SINGLE SENTENCE MESSAGE FROM THE TREE'S PERSPECTIVE RESPONDING TO THE HUMAN. Put this message in double quotation marks as the last sentence of your response. DON'T PUT ANY MESSAGE OR DESCRIPTION IN THE IMAGE."

    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=text_input,
            n=1,
            size="1024x1024",
        )
        logger.info(response)

        new_image_url = response.data[0].url
        new_image_bytes = requests.get(new_image_url).content

        new_description = response.data[0].revised_prompt
        # Extract the quoted message from the tree
        if '"' in new_description:
            # Find the last quoted string in the response
            parts = new_description.split('"')
            new_description = parts[-2] if len(parts) > 1 else new_description

        base64_image = f"data:image/jpeg;base64,{base64.b64encode(new_image_bytes).decode('utf-8')}"
        return ImageGenerationResponse(
            description=new_description,
            image_data=base64_image,
        )
    except Exception as e:
        logger.error(f"OpenAI API error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating image: {str(e)}")
