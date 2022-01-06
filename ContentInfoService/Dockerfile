FROM ubuntu:20.04

RUN apt-get update --fix-missing
RUN apt-get install -y python3 python3-pip
RUN pip install flask flask-restful flask-cors pymongo marshmallow dnspython

EXPOSE 5000

WORKDIR /usr/src/app
COPY app.py .
COPY constants.py .
COPY ContentInfo.py .
COPY DetailsInfo.py .

CMD ["flask", "run", "--host=0.0.0.0"]