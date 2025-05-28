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
```

5. Use Docker Stack to deploy multi-container application

```bash
export $(cat .env.prod) && docker stack deploy --compose-file docker-compose.prod.yml portfolio-shirsendu
```

6. Scale the service

```bash
docker service scale portfolio-shirsendu_app=5
```

7. Check

```bash
docker service ls
docker service ps portfolio-shirsendu_app
```
