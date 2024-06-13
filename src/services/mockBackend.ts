import { validateEmail } from '../utils/validation';

export type Property = {
  email: string;
  street: string;
  number?: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  status: string;
};

export type Contract = {
  property: string;
  personType: 'Pessoa Física' | 'Pessoa Jurídica';
  document: string;
  email: string;
  fullName: string;
};

let properties: Property[] = [];
const contracts: Contract[] = [];

export const submitProperty = async (property: Property): Promise<{ success: boolean; message?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!property.email || !property.street || !property.neighborhood || !property.city || !property.state) {
        resolve({ success: false, message: 'Todos os campos obrigatórios devem ser preenchidos.' });
      } else if (!validateEmail(property.email)) {
        resolve({ success: false, message: 'O e-mail fornecido não é válido.' });
      } else {
        properties.push({ ...property, status: 'Não contratado' });
        resolve({ success: true });
      }
    }, 1000);
  });
};

export const getProperties = async (): Promise<Property[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(properties);
    }, 1000);
  });
};

export const removeProperty = async (email: string): Promise<{ success: boolean; message?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      properties = properties.filter((property) => property.email !== email);
      resolve({ success: true });
    }, 1000);
  });
};

export const submitContract = async (contract: Contract): Promise<{ success: boolean; message?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const existingContract = contracts.find((c) => c.property === contract.property);
      if (existingContract) {
        resolve({ success: false, message: 'A propriedade já está associada a um contrato.' });
        return;
      }

      if (!validateEmail(contract.email)) {
        resolve({ success: false, message: 'O e-mail fornecido não é válido.' });
        return;
      }

      contracts.push(contract);
      resolve({ success: true });
    }, 1000);
  });
};

export const getContracts = async (): Promise<Contract[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(contracts);
    }, 1000);
  });
};