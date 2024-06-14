import { useState } from 'react';
import { validateEmail } from '../utils/validation';
import { submitProperty } from '../services/mockBackend';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  street: z.string(),
  number: z.string(),
  complement: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
});

function PropertyForm() {
  const [formData, setFormData] = useState({
    email: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error('O e-mail fornecido não é válido.');
      return;
    }

    try {
      schema.parse(formData);
      const property = {
        ...formData,
      };
      const response = await submitProperty(property);
      if (response.success) {
        toast.success('Imóvel cadastrado com sucesso!');
        setFormData({
          email: '',
          street: '',
          number: '',
          complement: '',
          neighborhood: '',
          city: '',
          state: '',
        });
        navigate('/propriedades-cadastradas');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error('Por favor, preencha os campos corretamente.');
      } else {
        toast.error('Ocorreu um erro ao processar o formulário.');
      }
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-md shadow-md">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="street" className="block text-sm font-medium text-gray-700">Rua</label>
        <input
          id="street"
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="number" className="block text-sm font-medium text-gray-700">Número</label>
        <input
          id="number"
          type="text"
          name="number"
          value={formData.number}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="complement" className="block text-sm font-medium text-gray-700">Complemento</label>
        <input
          id="complement"
          type="text"
          name="complement"
          value={formData.complement}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">Bairro</label>
        <input
          id="neighborhood"
          type="text"
          name="neighborhood"
          value={formData.neighborhood}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">Cidade</label>
        <input
          id="city"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">Estado</label>
        <input
          id="state"
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
        Cadastrar Imóvel
      </button>
    </form>
  );
}

export default PropertyForm;