import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '30s', target: 200 },
    { duration: '1m30s', target: 1000 },
    { duration: '20s', target: 0 },
  ],
}

export default function () {
  // const res = http.get('http://localhost:4100/api/health');
  const res = http.get('https://shirsendu-bairagi.dev/api/projects')
  check(res, { 'status was 200': (r) => r.status == 200 })
  sleep(1)
}
