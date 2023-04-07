import bcrypt from "bcrypt"

export default async function (password: string, saltRounds: number) {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash.toString()
}