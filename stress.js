/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { check, sleep } from 'k6';

const ids = [
  '328d7be9-cb00-45f5-961e-0a67408c62d3',
  '29f122cc-7b9e-4145-b332-a0df8a6210d1',
  '4074a0c2-2e5d-432a-a428-f45d8c8e2a83',
  '5d7a1df1-614a-43bf-b2cd-3763ee763419',
  '51047c6d-95b9-4dbc-a5b8-830ca4b4e340',
];

export const options = {
  vus: 600,
  duration: '30m',
  rps: 1000,
};

export default function () {
  // const data = {
  //   reservee: 'Kim Si Yong David 123',
  //   reservation_time: '2018-12-20 17:30:00',
  // };
  // const url = 'http://localhost:5882/api/51047c6d-95b9-4dbc-a5b8-830ca4b4e340/reservations';
  // const str = JSON.stringify(data);
  // const params = { headers: { 'Content-Type': 'application/json' } };
  // const res = http.post(url, str, params);
  const id = ids[Math.floor(Math.random() * ids.length)];
  const res = http.get(`http://localhost:5882/api/${id}/reservations`);
  check(res, {
    'status was 200': r => r.status === 200,
    'transaction time OK': r => r.timings.duration < 250,
  });
  sleep(1);
}
