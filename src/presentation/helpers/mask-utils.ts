export const maskCpf = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '');
  return cleanValue
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const maskRg = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '');
  return cleanValue
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d)\d+?$/, '$1');
};

export const maskZipCode = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '');
  return cleanValue
    .replace(/(\d{5})(\d{1,3})/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');
};

export const maskBirthDate = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '');
  return cleanValue
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})\d+?$/, '$1');
};
