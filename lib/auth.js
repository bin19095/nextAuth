import { hash, compare } from 'bcryptjs';

export async function hashPassword(password){
    if(!password){
        return;
    }
 const hashedPassword = await hash(password, 12);
 return hashedPassword;
}

export async function verifyPassword(password, hashedPassword){
    if(!password ||!hashedPassword){
        return;
    }
    const isValid = await compare(password, hashedPassword);
    return isValid;
}
