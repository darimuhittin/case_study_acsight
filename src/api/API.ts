const API_URL = 'https://gorest.co.in/public/v2/'

export const getQuery = async (query: string): Promise<any> => {
  return await fetch(`${API_URL}${query}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xvfci') as string}`
    }
  }).then(async (response) => await response.json())
}

export const getQueryForHeaderData = async (query: string): Promise<any> => {
  return await fetch(`${API_URL}${query}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xvfci') as string}`
    }
  }).then((response) => response)
}

export const postQuery = async (query: string, data: any): Promise<any> => {
  return await fetch(`${API_URL}${query}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('xvfci') as string}`
    },
    body: JSON.stringify(data)
  }).then((response) => response)
}

export const patchQuery = async (query: string, data: any): Promise<any> => {
  return await fetch(`${API_URL}${query}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('xvfci') as string}`
    },
    body: JSON.stringify(data)
  }).then((response) => response)
}

export const deleteQuery = async (query: string): Promise<any> => {
  return await fetch(`${API_URL}${query}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('xvfci') as string}`
    }
  }).then((response) => response)
}
