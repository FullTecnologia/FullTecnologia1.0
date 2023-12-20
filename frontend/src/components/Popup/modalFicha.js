import styles from './modalFicha.module.css';

// utils
import { formatData } from '../../utils/utils';

const ModalFicha = ({ ficha, onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button onClick={onClose} className={styles.closeButton}>&times;</button>
                <h2>Detalhes da Ficha</h2>
                {ficha ? (
                    <div>
                        <p>Data de Nascimento: {formatData(ficha.data_nascimento)}</p>
                        <p>Naturalidade: {ficha.naturalidade}</p>
                        <p>Nome da Mãe: {ficha.nome_mae}</p>
                        <p>Nome do Pai: {ficha.nome_pai}</p>
                        <p>CPF: {ficha.cpf}</p>
                        <p>Identidade (RG): {ficha.carteira_identidade}</p>
                        <p>Órgão Expedidor: {ficha.expedidor_identidade}</p>
                        <p>Data de Emissão da Identidade: {formatData(ficha.data_emissao_identidade)}</p>
                        <p>Título de Eleitor: {ficha.titulo_eleitor_numero}</p>
                        <p>Zona Eleitoral: {ficha.titulo_eleitor_zona}</p>
                        <p>Seção Eleitoral: {ficha.titulo_eleitor_secao}</p>
                        <p>CTPS (Número): {ficha.ctps_numero}</p>
                        <p>CTPS (Série): {ficha.ctps_serie}</p>
                        <p>CTPS (UF): {ficha.ctps_uf}</p>
                        <p>Data de Emissão CTPS: {formatData(ficha.ctps_data_emissao)}</p>
                        <p>Número PIS: {ficha.pis_numero}</p>
                        <p>Data de Cadastro PIS:  {formatData(ficha.pis_data_cadastro)}</p>
                        <p>Carteira de Habilitação (Número): {ficha.carteira_habilitacao_numero}</p>
                        <p>Categoria CNH: {ficha.carteira_habilitacao_categoria}</p>
                        <p>Estado Civil: {ficha.estado_civil}</p>
                        <p>Escolaridade: {ficha.escolaridade}</p>
                        <p>Raça/Cor: {ficha.raca_cor}</p>
                        <p>Reservista (Número): {ficha.certificado_reservista_numero}</p>
                        <p>Categoria Reservista: {ficha.certificado_reservista_categoria}</p>
                        <p>Nome do Companheiro(a): {ficha.nome_companheiro}</p>
                        <p>Endereço: {ficha.endereco}, Nº {ficha.endereco_numero}</p>
                        <p>CEP: {ficha.endereco_cep}</p>
                        <p>Complemento: {ficha.endereco_complemento}</p>
                        <p>Cidade: {ficha.endereco_cidade}</p>
                        <p>Bairro: {ficha.endereco_bairro}</p>
                        <p>UF: {ficha.endereco_uf}</p>
                        <p>Cargo: {ficha.cargo}</p>
                        <p>CBO: {ficha.cbo}</p>
                        <p>Data de Admissão: {formatData(ficha.data_admissao)}</p>
                        <p>Salário: {ficha.salario}</p>
                        <p>Contrato de Experiência: {ficha.contrato_experiencia}</p>
                        <p>Horário de Trabalho: {ficha.horario_trabalho}</p>
                        <p>Intervalo: {ficha.intervalo}</p>
                        <p>Descanso: {ficha.descanso}</p>
                        <p>Horário de Trabalho aos Sábados: {ficha.horario_sabado}</p>
                        <p>Vale Transporte: {ficha.vale_transporte ? 'Sim' : 'Não'}</p>
                        <p>Informações Complementares: {ficha.informacoes_complementares}</p>
                    </div>
                ) : (
                    <p>Carregando dados...</p>
                )}
            </div>
        </div>
    );
};

export default ModalFicha;
