<p align="center">
  <img src="./public/logo.png" lt="Logo" width="65" />
<p>

# Portfolio Shirsendu

> Shirsendu's devfolio showcasing his projects, experience and certification in a visually appealing manner

<p align="center">
  <a href="https://shirsendu-bairagi.betteruptime.com">
    <img src="https://uptime.betterstack.com/status-badges/v3/monitor/10aqw.svg" alt="uptime status">
  </a>
</p>

![Landing](public/previews/landing.webp)

REPO_NAME=portfolio-shirsendu
OLD_TAG=v1.11.3
NEW_TAG=v1.11.4
IN_PORT=1000
OUT_PORT=3000
IMAGE_NAME=algostract/portfolio-shirsendu

docker stop {{ env.REPO_NAME }}-{{ env.OLD_TAG }}
docker rm {{ env.REPO_NAME }}-{{ env.OLD_TAG }}
docker rmi {{ env.REPO_NAME }}:{{ env.OLD_TAG }}
docker pull ghcr.io/{{ env.IMAGE_NAME }}
docker run --name {{ env.REPO_NAME }}-{{ env.NEW_TAG }} --env-file .env.prod -p {{ env.IN_PORT }}:{{ env.OUT_PORT }} -d {{ env.REPO_NAME }}:{{ env.NEW_TAG }}
