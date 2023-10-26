import request from '@/utils/request';
import { apiPrefix } from '@/utils/constant';
import type { TeamPayload } from '@/types/team';

export function getTeamsApi() {
  return request.get(`${apiPrefix}/teams`);
}

export function createTeamApi(data: TeamPayload) {
  return request.post(`${apiPrefix}/team`, data);
}

export function editTeamApi(_id: string, data: TeamPayload) {
  return request.put(`${apiPrefix}/team/${_id}`, data);
}

export function deleteTeamApi(_id: string) {
  return request.delete(`${apiPrefix}/team/${_id}`);
}
