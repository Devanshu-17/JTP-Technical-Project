# Description: Dockerfile for the FastAPI backend
FROM python:3.10

# Set the working directory inside the container
WORKDIR /code

# Copy the requirements.txt file into the container
COPY ./requirements.txt /code/requirements.txt

# Install the Python dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the rest of the code into the container
COPY ./ /code/

# Expose port 8000 for the FastAPI server
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]