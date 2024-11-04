import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './styles.css'; // Certifique-se de importar o mesmo CSS

const CommercialForm = () => {
    const { register, handleSubmit } = useForm();
    const [formData, setFormData] = useState({
        locador: '',
        locadorIdentidade: '',
        locadorCpf: '',
        locadorEndereco: '',
        locataria: '',
        locatariaCnpj: '',
        locatariaEndereco: '',
        representante: '',
        representanteCpf: '',
        duracao: '',
        valorAluguel: '',
        local: '',
        cep: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onSubmit = (data) => {
        console.log(data);
        // Aqui você pode implementar a lógica para gerar o PDF ou enviar os dados
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Contrato Comercial</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <h2 className="text-xl font-semibold">Identificação das Partes Contratantes</h2>
                    <label className="block">
                        Locador:
                        <input {...register("locador")} type="text" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        Carteira de Identidade nº:
                        <input {...register("locadorIdentidade")} type="text" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        C.P.F. nº:
                        <input {...register("locadorCpf")} type="text" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        Endereço:
                        <input {...register("locadorEndereco")} type="text" required className="input" onChange={handleChange} />
                    </label>

                    <label className="block">
                        Locatária:
                        <input {...register("locataria")} type="text" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        CNPJ:
                        <input {...register("locatariaCnpj")} type="text" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        Endereço:
                        <input {...register("locatariaEndereco")} type="text" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        Representante:
                        <input {...register("representante")} type="text" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        C.P.F. do Representante:
                        <input {...register("representanteCpf")} type="text" required className="input" onChange={handleChange} />
                    </label>

                    <h2 className="text-xl font-semibold">Duração do Contrato</h2>
                    <label className="block">
                        Duração (meses):
                        <input {...register("duracao")} type="number" required className="input" onChange={handleChange} />
                    </label>

                    <h2 className="text-xl font-semibold">Valor do Aluguel</h2>
                    <label className="block">
                        Valor (R$):
                        <input {...register("valorAluguel")} type="text" required className="input" onChange={handleChange} />
                    </label>

                    <h2 className="text-xl font-semibold">Local do Imóvel</h2>
                    <label className="block">
                        Endereço:
                        <input {...register("local")} type="text" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        CEP:
                        <input {...register("cep")} type="text" required className="input" onChange={handleChange} />
                    </label>

                    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
                        Gerar Contrato
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CommercialForm;
