FROM python:3

WORKDIR /app

COPY requierments.txt .

RUN pip install --no-cache-dir -r requierments.txt
COPY ./app .

CMD ["python","run.py"]
