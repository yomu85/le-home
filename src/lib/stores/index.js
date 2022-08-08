import axios from 'axios'
import { writable, get } from 'svelte/store'

export const leVal = writable([])
export const loading = writable(false)

export async function getPatchData() {
  if (get(loading)) return
  loading.set(true)

  const res = await axios.get('/.netlify/functions/notion')
  const { results } = res.data
  leVal.set(results)
  console.log(get(leVal))

  loading.set(false)
}