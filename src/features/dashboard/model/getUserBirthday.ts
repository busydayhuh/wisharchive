export function getUserBirthday(birthDate: string) {
  const birthday = new Date(birthDate);

  return birthday.toLocaleDateString();
}
