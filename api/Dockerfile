FROM python:3.10
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip3 install -r requirements.txt
COPY . .
ENV PORT=5000
EXPOSE ${PORT}
CMD [ "python", "main.py" ]
