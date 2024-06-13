import React, { useState, useEffect } from 'react';
import { getProperties, submitContract, Property } from '../services/mockBackend';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputMask from 'react-input-mask';
import { validateDocument, validateEmail } from '../utils/validation';
import { useNavigate } from 'react-router-dom';

function ContractForm() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [personType, setPersonType] = useState<'Pessoa Física' | 'Pessoa Jurídica'>('Pessoa Física');
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getProperties().then((data) => setProperties(data));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProperty || !email || !fullName || !document) {
      toast.error('Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }

    if (properties.find((property) => property.email === selectedProperty && property.status === 'Contratado')) {
      toast.error('Essa propriedade já está associada a um contrato.');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('O e-mail fornecido não é válido.');
      return;
    }

    if (!validateDocument(document, personType)) {
      toast.error('O documento fornecido não é válido.');
      return;
    }

    const contract = {
      property: selectedProperty,
      personType,
      document,
      email,
      fullName,
    };

    submitContract(contract).then((response) => {
      if (response.success) {
        toast.success('Contrato cadastrado com sucesso!');
        setSelectedProperty('');
        setPersonType('Pessoa Física');
        setDocument('');
        setEmail('');
        setFullName('');
        navigate('/contratos-cadastrados');
      } else {
        toast.error(response.message || 'Erro ao cadastrar contrato.');
      }
    });
  };

  const mask = personType === 'Pessoa Física' ? '999.999.999-99' : '99.999.999/9999-99';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-md shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Propriedade</label>
        <select
          value={selectedProperty}
          onChange={(e) => setSelectedProperty(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Selecione uma propriedade</option>
          {properties.map((property) => (
            <option key={property.email} value={property.email}>
              {`${property.street}, ${property.number || ''}, ${property.complement || ''}, ${property.neighborhood}`}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo de Pessoa</label>
        <select
          value={personType}
          onChange={(e) => setPersonType(e.target.value as 'Pessoa Física' | 'Pessoa Jurídica')}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="Pessoa Física">Pessoa Física</option>
          <option value="Pessoa Jurídica">Pessoa Jurídica</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Documento</label>
        <InputMask
          mask={mask}
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">E-mail do Contratante</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome Completo do Contratante</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
        Cadastrar Contrato
      </button>
    </form>
  );
}

export default ContractForm;
