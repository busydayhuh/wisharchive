export function getUserBirthday(birthDate: string) {
  return new Date(birthDate).toLocaleDateString();
}
