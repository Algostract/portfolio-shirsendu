<p align="center">
  <img src="./public/logo.png" lt="Logo" width="65" />
<p>

# Portfolio Shirsendu

<p align="center">
  <a href="https://shirsendu-bairagi.betteruptime.com">
    <img src="https://uptime.betterstack.com/status-badges/v3/monitor/10aqw.svg" alt="uptime status">
  </a>
</p>

![Landing](public/previews/landing.webp)

> Shirsendu's devfolio showcasing his projects, experience and certification in a visually appealing manner

- 📦 SSR
- 🖼️ OG Tags
- 🚀 PWA
- ✋ Push Notification
- 🌙 Light/Dark Mode
- 🗂️ CMS (Notion)
- 🤖 Automation (Email, Whatsapp)
- 🐋 Containerized
- 🪄 CI/CD (Github Action)
- ⚡️ API Route Caching
- 📐 Analytics

## How to Deploy

1. Initialize Swarm on the Manager Node

```bash
docker swarm init --advertise-addr <MANAGER-IP>
```

2. Join Worker Nodes to the Swarm

```bash
docker swarm join --token <WORKER-TOKEN> <MANAGER-IP>:2377
```

3. Check Node Status

```bash
docker node ls
```

4. Create a docker volume

```bash
docker volume create \
  --name portfolio-shirsendu_static \
  --driver local \
  --opt type=none \
  --opt device=~/Algostract/portfolio-shirsendu/static \
  --opt o=bind

docker volume create \
  --name portfolio-shirsendu_data \
  --driver local \
  --opt type=none \
  --opt device=~/Algostract/portfolio-shirsendu/.data \
  --opt o=bind
```

5. Use Docker Stack to deploy multi-container application

```bash
docker stack deploy --compose-file docker-compose.prod.yml portfolio-shirsendu
```

6. Scale service

```bash
docker service scale portfolio-shirsendu_app=2
```

7. Verify

```bash
docker service ls
docker service ps portfolio-shirsendu_app
```
