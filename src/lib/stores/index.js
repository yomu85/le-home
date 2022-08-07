import axios from 'axios'
import { writable, get } from 'svelte/store'

export const lePvu = writable([])

export async function getPatchData() {
  const res = await axios.get('/.netlify/functions/notion')
  const { results } = res.data
  lePvu.set(results)
  console.log(get(lePvu))
}