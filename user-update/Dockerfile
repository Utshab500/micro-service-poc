FROM python:3.10-slim

ARG ENV

COPY . /app

WORKDIR /app

COPY .env.${ENV} .env

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]