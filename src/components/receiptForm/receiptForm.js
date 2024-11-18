import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import jsPDF from 'jspdf';
import './styles.css';

function ReciboAluguel() {
    const { register, handleSubmit } = useForm();
    const [step, setStep] = useState(1);

    const onSubmit = (data) => {
        const doc = new jsPDF('p', 'mm', 'a4');
    
        const lineHeight = 8; // Altura da linha
        const marginX = 20; // Margem horizontal
        const marginY = 20; // Margem vertical
        const pageWidth = doc.internal.pageSize.width - 2 * marginX; // Largura disponível
        const pageHeight = doc.internal.pageSize.height; // Altura da página
        let cursorY = marginY; // Cursor vertical inicial
    
        // Função para verificar se precisa de uma nova página
        const checkPageBreak = (increment = lineHeight) => {
            if (cursorY + increment > pageHeight - marginY) {
                doc.addPage();
                cursorY = marginY; // Reinicia o cursor no topo da nova página
            }
        };
    
        // Título
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('RECIBO DE ALUGUEL', pageWidth / 2 + marginX, cursorY, { align: 'center' });
        cursorY += lineHeight + 5;
    
        // Texto principal
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Recebi do(a): `, marginX, cursorY);
        doc.setFont('helvetica', 'bold');
        doc.text(`${data.nomeLocatario}`, marginX + 30, cursorY); // Nome em negrito
        doc.setFont('helvetica', 'normal');
        cursorY += lineHeight;
        checkPageBreak();
    
        doc.text(`a quantia de `, marginX, cursorY);
        doc.setFont('helvetica', 'bold');
        doc.text(`R$ ${data.valorAluguel},00`, marginX + 25, cursorY); // Valor em negrito
        doc.setFont('helvetica', 'normal');
        doc.text(`em moeda corrente, referente ao aluguel do imóvel situado`, marginX + 50, cursorY);
        cursorY += lineHeight;
        checkPageBreak();

        doc.text(`no endereço `, marginX, cursorY);
        doc.setFont('helvetica', 'bold');
        doc.text(`${data.enderecoImovel},`, marginX + 25, cursorY); // Endereço em negrito
        doc.setFont('helvetica', 'normal');
        doc.text(`,`, marginX + 80, cursorY);
    
        cursorY += lineHeight;
        doc.text(`vencido no dia `, marginX, cursorY);
        doc.setFont('helvetica', 'bold');
        doc.text(`${data.diaVencimento}`, marginX + 28, cursorY); // Data de vencimento em negrito
        doc.setFont('helvetica', 'normal');
        doc.text(`, dando plena, total e irrevogável quitação.`, marginX + 50, cursorY);
    
        // Assinatura e data
        cursorY += lineHeight * 2;
        checkPageBreak();
        doc.line(marginX, cursorY, pageWidth + marginX, cursorY); // Linha de assinatura
        cursorY += lineHeight;
        doc.text('Assinatura do Locador', pageWidth / 2 + marginX, cursorY, { align: 'center' });
    
        cursorY += lineHeight * 2;
        checkPageBreak();
        doc.text(`Data da quitação: `, marginX, cursorY);
        doc.setFont('helvetica', 'bold');
        doc.text(`${data.dataRecibo}`, marginX + 40, cursorY); // Data de quitação em negrito
    
        // Salvar o PDF
        doc.save('recibo-aluguel.pdf');
    };
    
    
    
    
    
    

    //const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Recibo de Aluguel</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {step === 1 && (
                        <>
                            <h2 className="text-xl font-semibold">Informações do Locatário</h2>
                            <input {...register("nomeLocatario")} placeholder="Nome do Locatário" required className="input" />
                            <input {...register("valorAluguel")} placeholder="Valor do Aluguel (R$)" required className="input" />
                            <input {...register("enderecoImovel")} placeholder="Endereço do Imóvel" required className="input" />
                            <input {...register("diaVencimento")} placeholder="Dia do Vencimento" required className="input" />
                            <input {...register("mesVencimento")} placeholder="Mês do Vencimento" required className="input" />
                            <input {...register("anoVencimento")} placeholder="Ano do Vencimento" required className="input" />
                            <input {...register("dataRecibo")} placeholder="Data do Recibo (dd/mm/aaaa)" required className="input" />
                        </>
                    )}

                    <div className="flex justify-between">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
                            >
                                Voltar
                            </button>
                        )}
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                        >
                            Gerar PDF
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReciboAluguel;
