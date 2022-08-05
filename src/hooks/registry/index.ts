import { createContext, FormEvent } from "react"
import { db } from "../../database/db"

export interface Entry {
    id: string
    title: string
    value: number
    category: string
    createdOn: Date
}

class EntryEntity implements Entry {
    id: string
    title: string
    value: number
    category: string
    createdOn: Date

    constructor ({id, title, value, category, createdOn}: Entry) {
        this.id = id
        this.title = title
        this.value = value
        this.category = category
        this.createdOn = new Date(createdOn)
    }
}

export let entries: Entry[] = []
localStorage.setItem("perxp:entries", JSON.stringify(db))
const localEntries = localStorage.getItem("perxp:entries")

if (localEntries) entries = JSON.parse(localEntries).map((entry: Entry) => {
    return new EntryEntity({...entry})
})

export const RegistryContext = createContext({
    entries,
    setEntries: () => {},
    setNewEntry: (event: FormEvent<HTMLInputElement>) => {},
    entry: {
        id: "",
        title: "",
        category: "",
        value: 0,
        createdOn: new Date()
    }
})
