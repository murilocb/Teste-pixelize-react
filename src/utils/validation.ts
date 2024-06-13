export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validateDocument = (document: string, personType: 'Pessoa Física' | 'Pessoa Jurídica'): boolean => {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

  if (personType === 'Pessoa Física') {
    return cpfRegex.test(document);
  } else {
    return cnpjRegex.test(document);
  }
};