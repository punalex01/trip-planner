FROM ubuntu:22.04 AS builder-image
RUN  apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y software-properties-common && \
    add-apt-repository -y ppa:deadsnakes/ppa && \
    apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt install -y python3.12 python3.12-dev python3.12-venv

# create and activate virtual environment
RUN python3.12 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# install requirements
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r ./requirements.txt

FROM ubuntu:22.04 AS runner-image
RUN apt-get update && \
    apt-get install -y software-properties-common && \
    add-apt-repository -y ppa:deadsnakes/ppa && \
    apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt install -y python3.12 python3.12-venv

COPY --from=builder-image /opt/venv /opt/venv
# COPY run.py .
# COPY src ./src
# COPY .env ./.env
# COPY gunicorn-config.py ./gunicorn-cfg.py

EXPOSE 5000

# activate virtual environment
ENV VIRTUAL_ENV=/opt/venv
ENV PATH="/opt/venv/bin:$PATH"
ENV FLASK_APP=run.py

# CMD ["flask", "run", "--host", "0.0.0.0"]
WORKDIR "/api"
CMD ["gunicorn", "--config", "gunicorn-config.py", "run:app", "--reload"]