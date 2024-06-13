import { useEffect, useState } from 'react';
import { getContracts, Contract } from '../services/mockBackend';

function ContractTable() {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    const data = await getContracts();
    setContracts(data);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-md shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 text-center">Propriedade</th>
            <th className="py-2 px-4 border-b border-gray-200 text-center">Tipo de Pessoa</th>
            <th className="py-2 px-4 border-b border-gray-200 text-center">Documento</th>
            <th className="py-2 px-4 border-b border-gray-200 text-center">E-mail</th>
            <th className="py-2 px-4 border-b border-gray-200 text-center">Nome Completo</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b border-gray-200 text-center">{contract.property}</td>
              <td className="py-2 px-4 border-b border-gray-200 text-center">{contract.personType}</td>
              <td className="py-2 px-4 border-b border-gray-200 text-center">{contract.document}</td>
              <td className="py-2 px-4 border-b border-gray-200 text-center">{contract.email}</td>
              <td className="py-2 px-4 border-b border-gray-200 text-center">{contract.fullName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContractTable;
