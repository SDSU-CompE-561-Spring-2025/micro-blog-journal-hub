FROM python:3.11-slim

WORKDIR /app

COPY pyproject.toml .
RUN pip install --upgrade pip && pip install hatch

COPY . .

CMD ["hatch", "run", "dev"]