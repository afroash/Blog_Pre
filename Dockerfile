FROM python:3.10-slim

#Set environmental viariables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1
ENV APP_ENV dev


#Create the working directory
WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

#Install required packages
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY . /app

#Expose the port which application will run. 
EXPOSE 8000
COPY entrypoint.sh /app/
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]