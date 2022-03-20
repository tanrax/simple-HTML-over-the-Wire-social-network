# Image
FROM python:3.10

# Display the Python output through the terminal
ENV PYTHONUNBUFFERED: 1

# Set work directory
WORKDIR /usr/src/app

# Add pg_isready command
RUN apt update
RUN apt install -y postgresql-client

# Add Python dependencies
## Update pip
RUN  pip install --upgrade pip
## Copy requirements
COPY requirements.txt ./requirements.txt
## Install requirements
RUN pip3 install -r requirements.txt
