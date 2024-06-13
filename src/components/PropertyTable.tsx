import { useEffect, useState } from 'react';
import { getProperties, removeProperty, Property } from '../services/mockBackend';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PropertyTable() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [sorted, setSorted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const data = await getProperties();
    setProperties(data);
  };

  const handleRemove = async (email: string) => {
    setLoading(true);
    const response = await removeProperty(email);
    if (response.success) {
      setProperties(properties.filter((property) => property.email !== email));
    } else {
      toast.success(response.message);
    }
    setLoading(false);
  };

  const handleSort = () => {
    const sortedProperties = [...properties].sort((a, b) => a.email.localeCompare(b.email));
    setProperties(sortedProperties);
    setSorted(true);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-md shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 text-center">
              <button onClick={handleSort} className="font-semibold text-gray-700">
                E-mail do Proprietário {sorted && '🔽'}
              </button>
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-center">Endereço</th>
            <th className="py-2 px-4 border-b border-gray-200 text-center">Status</th>
            <th className="py-2 px-4 border-b border-gray-200 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.email}>
              <td className="py-2 px-4 border-b border-gray-200 text-center">{property.email}</td>
              <td className="py-2 px-4 border-b border-gray-200 text-center">
                {`${property.street}, ${property.number || ''}, ${property.city}, ${property.state}`}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-center">{property.status}</td>
              <td className="py-2 px-4 border-b border-gray-200 text-center">
                <button
                  onClick={() => handleRemove(property.email)}
                  className={`text-red-600 hover:underline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p className="text-center mt-4">Removendo...</p>}
    </div>
  );
}

export default PropertyTable;
