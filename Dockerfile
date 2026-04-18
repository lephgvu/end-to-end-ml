# Base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ project
COPY . .

# Expose port
EXPOSE 5000

# Run app
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app.app:app"]