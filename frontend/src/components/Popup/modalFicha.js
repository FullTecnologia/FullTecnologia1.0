import styles from './modalFicha.module.css';

import React, { useState, useEffect } from 'react';

// hooks
import { listarHabilidades, editarFicha } from '../../hooks/apiService';

// utils
import { formatData } from '../../utils/utils';

const ModalFicha = ({ ficha, onClose }) => {
    const [habilidades, setHabilidades] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar a exibição do formulário de edição
    const [editedData, setEditedData] = useState({ ...ficha });

    // Função para lidar com a submissão do formulário de edição
    const handleEditSubmit = async () => {
        try {
            // Enviar os dados editados para a função de edição da ficha
            await editarFicha(editedData);

            // Atualize os detalhes da ficha com os novos dados
            setIsEditing(false);

            // Recarregue as habilidades após a edição
            const habilidadesUsuario = await listarHabilidades(ficha.id_usuario);
            setHabilidades(habilidadesUsuario);
        } catch (error) {
            console.error('Erro ao editar a ficha:', error);
        }
    };

    // Função para cancelar a edição e voltar à exibição dos detalhes
    const cancelEdit = () => {
        setIsEditing(false);
    };

    useEffect(() => {
        const fetchHabilidades = async () => {
            try {
                const habilidadesUsuario = await listarHabilidades(ficha.id_usuario);
                setHabilidades(habilidadesUsuario);
            } catch (error) {
                console.error('Erro ao buscar habilidades:', error);
            }
        };

        if (ficha && ficha.id_usuario) {
            fetchHabilidades();
        }
    }, [ficha]);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button onClick={onClose} className={styles.closeButton}>&times;</button>
                <h2>Detalhes da Ficha</h2>

                {isEditing ? (
                    // Renderize o formulário de edição aqui
                    <div>
                        <h3>Editar Ficha</h3>
                        <form>
                            <div className="form-group">
                                <label htmlFor="data_nascimento">Data de Nascimento:</label>
                                <input
                                    type="text"
                                    id="data_nascimento"
                                    name="data_nascimento"
                                    value={formatData(editedData.data_admissao)}
                                    onChange={(e) => setEditedData({ ...editedData, data_nascimento: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="naturalidade">Naturalidade:</label>
                                <input
                                    type="text"
                                    id="naturalidade"
                                    name="naturalidade"
                                    value={editedData.naturalidade}
                                    onChange={(e) => setEditedData({ ...editedData, naturalidade: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nome_mae">Nome da Mãe:</label>
                                <input
                                    type="text"
                                    id="nome_mae"
                                    name="nome_mae"
                                    value={editedData.nome_mae}
                                    onChange={(e) => setEditedData({ ...editedData, nome_mae: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nome_pai">Nome do Pai:</label>
                                <input
                                    type="text"
                                    id="nome_pai"
                                    name="nome_pai"
                                    value={editedData.nome_pai}
                                    onChange={(e) => setEditedData({ ...editedData, nome_pai: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cpf">CPF:</label>
                                <input
                                    type="text"
                                    id="cpf"
                                    name="cpf"
                                    value={editedData.cpf}
                                    onChange={(e) => setEditedData({ ...editedData, cpf: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="expedidor_identidade">Órgão Expedidor:</label>
                                <input
                                    type="text"
                                    id="expedidor_identidade"
                                    name="expedidor_identidade"
                                    value={editedData.expedidor_identidade}
                                    onChange={(e) => setEditedData({ ...editedData, expedidor_identidade: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="data_emissao_identidade">Data de Emissão da Identidade:</label>
                                <input
                                    type="text"
                                    id="data_emissao_identidade"
                                    name="data_emissao_identidade"
                                    value={formatData(editedData.data_emissao_identidade)}
                                    onChange={(e) => setEditedData({ ...editedData, data_emissao_identidade: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="titulo_eleitor_numero">Título de Eleitor:</label>
                                <input
                                    type="text"
                                    id="titulo_eleitor_numero"
                                    name="titulo_eleitor_numero"
                                    value={editedData.titulo_eleitor_numero}
                                    onChange={(e) => setEditedData({ ...editedData, titulo_eleitor_numero: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="titulo_eleitor_zona">Zona Eleitoral:</label>
                                <input
                                    type="text"
                                    id="titulo_eleitor_zona"
                                    name="titulo_eleitor_zona"
                                    value={editedData.titulo_eleitor_zona}
                                    onChange={(e) => setEditedData({ ...editedData, titulo_eleitor_zona: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="titulo_eleitor_secao">Seção Eleitoral:</label>
                                <input
                                    type="text"
                                    id="titulo_eleitor_secao"
                                    name="titulo_eleitor_secao"
                                    value={editedData.titulo_eleitor_secao}
                                    onChange={(e) => setEditedData({ ...editedData, titulo_eleitor_secao: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="ctps_numero">CTPS (Número):</label>
                                <input
                                    type="text"
                                    id="ctps_numero"
                                    name="ctps_numero"
                                    value={editedData.ctps_numero}
                                    onChange={(e) => setEditedData({ ...editedData, ctps_numero: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="ctps_serie">CTPS (Série):</label>
                                <input
                                    type="text"
                                    id="ctps_serie"
                                    name="ctps_serie"
                                    value={editedData.ctps_serie}
                                    onChange={(e) => setEditedData({ ...editedData, ctps_serie: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="ctps_uf">CTPS (UF):</label>
                                <input
                                    type="text"
                                    id="ctps_uf"
                                    name="ctps_uf"
                                    value={editedData.ctps_uf}
                                    onChange={(e) => setEditedData({ ...editedData, ctps_uf: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="ctps_data_emissao">Data de Emissão CTPS:</label>
                                <input
                                    type="text"
                                    id="ctps_data_emissao"
                                    name="ctps_data_emissao"
                                    value={formatData(editedData.ctps_data_emissao)}
                                    onChange={(e) => setEditedData({ ...editedData, ctps_data_emissao: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pis_numero">Número PIS:</label>
                                <input
                                    type="text"
                                    id="pis_numero"
                                    name="pis_numero"
                                    value={editedData.pis_numero}
                                    onChange={(e) => setEditedData({ ...editedData, pis_numero: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="pis_data_cadastro">Data de Cadastro PIS:</label>
                                <input
                                    type="text"
                                    id="pis_data_cadastro"
                                    name="pis_data_cadastro"
                                    value={formatData(editedData.pis_data_cadastro)}
                                    onChange={(e) => setEditedData({ ...editedData, pis_data_cadastro: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="carteira_habilitacao_numero">Carteira de Habilitação (Número):</label>
                                <input
                                    type="text"
                                    id="carteira_habilitacao_numero"
                                    name="carteira_habilitacao_numero"
                                    value={editedData.carteira_habilitacao_numero}
                                    onChange={(e) => setEditedData({ ...editedData, carteira_habilitacao_numero: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="carteira_habilitacao_categoria">Categoria CNH:</label>
                                <input
                                    type="text"
                                    id="carteira_habilitacao_categoria"
                                    name="carteira_habilitacao_categoria"
                                    value={editedData.carteira_habilitacao_categoria}
                                    onChange={(e) => setEditedData({ ...editedData, carteira_habilitacao_categoria: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="estado_civil">Estado Civil:</label>
                                <input
                                    type="text"
                                    id="estado_civil"
                                    name="estado_civil"
                                    value={editedData.estado_civil}
                                    onChange={(e) => setEditedData({ ...editedData, estado_civil: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="escolaridade">Escolaridade:</label>
                                <input
                                    type="text"
                                    id="escolaridade"
                                    name="escolaridade"
                                    value={editedData.escolaridade}
                                    onChange={(e) => setEditedData({ ...editedData, escolaridade: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="raca_cor">Raça/Cor:</label>
                                <input
                                    type="text"
                                    id="raca_cor"
                                    name="raca_cor"
                                    value={editedData.raca_cor}
                                    onChange={(e) => setEditedData({ ...editedData, raca_cor: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="certificado_reservista_numero">Reservista (Número):</label>
                                <input
                                    type="text"
                                    id="certificado_reservista_numero"
                                    name="certificado_reservista_numero"
                                    value={editedData.certificado_reservista_numero}
                                    onChange={(e) => setEditedData({ ...editedData, certificado_reservista_numero: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="certificado_reservista_categoria">Categoria Reservista:</label>
                                <input
                                    type="text"
                                    id="certificado_reservista_categoria"
                                    name="certificado_reservista_categoria"
                                    value={editedData.certificado_reservista_categoria}
                                    onChange={(e) => setEditedData({ ...editedData, certificado_reservista_categoria: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nome_companheiro">Nome do Companheiro(a):</label>
                                <input
                                    type="text"
                                    id="nome_companheiro"
                                    name="nome_companheiro"
                                    value={editedData.nome_companheiro}
                                    onChange={(e) => setEditedData({ ...editedData, nome_companheiro: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endereco">Endereço:</label>
                                <input
                                    type="text"
                                    id="endereco"
                                    name="endereco"
                                    value={editedData.endereco}
                                    onChange={(e) => setEditedData({ ...editedData, endereco: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="endereco_numero">Nº:</label>
                                <input
                                    type="text"
                                    id="endereco_numero"
                                    name="endereco_numero"
                                    value={editedData.endereco_numero}
                                    onChange={(e) => setEditedData({ ...editedData, endereco_numero: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endereco_cep">CEP:</label>
                                <input
                                    type="text"
                                    id="endereco_cep"
                                    name="endereco_cep"
                                    value={editedData.endereco_cep}
                                    onChange={(e) => setEditedData({ ...editedData, endereco_cep: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endereco_complemento">Complemento:</label>
                                <input
                                    type="text"
                                    id="endereco_complemento"
                                    name="endereco_complemento"
                                    value={editedData.endereco_complemento}
                                    onChange={(e) => setEditedData({ ...editedData, endereco_complemento: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endereco_cidade">Cidade:</label>
                                <input
                                    type="text"
                                    id="endereco_cidade"
                                    name="endereco_cidade"
                                    value={editedData.endereco_cidade}
                                    onChange={(e) => setEditedData({ ...editedData, endereco_cidade: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endereco_bairro">Bairro:</label>
                                <input
                                    type="text"
                                    id="endereco_bairro"
                                    name="endereco_bairro"
                                    value={editedData.endereco_bairro}
                                    onChange={(e) => setEditedData({ ...editedData, endereco_bairro: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endereco_uf">UF:</label>
                                <input
                                    type="text"
                                    id="endereco_uf"
                                    name="endereco_uf"
                                    value={editedData.endereco_uf}
                                    onChange={(e) => setEditedData({ ...editedData, endereco_uf: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cargo">Cargo:</label>
                                <input
                                    type="text"
                                    id="cargo"
                                    name="cargo"
                                    value={editedData.cargo}
                                    onChange={(e) => setEditedData({ ...editedData, cargo: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cbo">CBO:</label>
                                <input
                                    type="text"
                                    id="cbo"
                                    name="cbo"
                                    value={editedData.cbo}
                                    onChange={(e) => setEditedData({ ...editedData, cbo: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="data_admissao">Data de Admissão:</label>
                                <input
                                    type="date"
                                    id="data_admissao"
                                    name="data_admissao"
                                    value={editedData.data_admissao}
                                    onChange={(e) => setEditedData({ ...editedData, data_admissao: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="salario">Salário:</label>
                                <input
                                    type="text"
                                    id="salario"
                                    name="salario"
                                    value={editedData.salario}
                                    onChange={(e) => setEditedData({ ...editedData, salario: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="contrato_experiencia">Contrato de Experiência:</label>
                                <input
                                    type="text"
                                    id="contrato_experiencia"
                                    name="contrato_experiencia"
                                    value={editedData.contrato_experiencia}
                                    onChange={(e) => setEditedData({ ...editedData, contrato_experiencia: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="horario_trabalho">Horário de Trabalho:</label>
                                <input
                                    type="text"
                                    id="horario_trabalho"
                                    name="horario_trabalho"
                                    value={editedData.horario_trabalho}
                                    onChange={(e) => setEditedData({ ...editedData, horario_trabalho: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="intervalo">Intervalo:</label>
                                <input
                                    type="text"
                                    id="intervalo"
                                    name="intervalo"
                                    value={editedData.intervalo}
                                    onChange={(e) => setEditedData({ ...editedData, intervalo: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="descanso">Descanso:</label>
                                <input
                                    type="text"
                                    id="descanso"
                                    name="descanso"
                                    value={editedData.descanso}
                                    onChange={(e) => setEditedData({ ...editedData, descanso: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="horario_sabado">Horário de Trabalho aos Sábados:</label>
                                <input
                                    type="text"
                                    id="horario_sabado"
                                    name="horario_sabado"
                                    value={editedData.horario_sabado}
                                    onChange={(e) => setEditedData({ ...editedData, horario_sabado: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="vale_transporte">Vale Transporte:</label>
                                <select
                                    id="vale_transporte"
                                    name="vale_transporte"
                                    value={editedData.vale_transporte}
                                    onChange={(e) => setEditedData({ ...editedData, vale_transporte: e.target.value })}
                                >
                                    <option value="true">Sim</option>
                                    <option value="false">Não</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="informacoes_complementares">Informações Complementares:</label>
                                <input
                                    type="text"
                                    id="informacoes_complementares"
                                    name="informacoes_complementares"
                                    value={editedData.informacoes_complementares}
                                    onChange={(e) => setEditedData({ ...editedData, informacoes_complementares: e.target.value })}
                                />
                            </div>
                        </form>

                        <button onClick={handleEditSubmit}>Salvar</button>
                        <button onClick={cancelEdit}>Cancelar</button>
                    </div>
                ) : (
                    ficha ? (
                        <div>
                            <div className="ficha-details">
                                <div className="ficha-column">
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
                                    <p>Data de Cadastro PIS: {formatData(ficha.pis_data_cadastro)}</p>
                                    <p>Carteira de Habilitação (Número): {ficha.carteira_habilitacao_numero}</p>
                                    <p>Categoria CNH: {ficha.carteira_habilitacao_categoria}</p>
                                    <p>Estado Civil: {ficha.estado_civil}</p>
                                    <p>Escolaridade: {ficha.escolaridade}</p>
                                    <p>Raça/Cor: {ficha.raca_cor}</p>
                                    <p>Reservista (Número): {ficha.certificado_reservista_numero}</p>
                                    <p>Categoria Reservista: {ficha.certificado_reservista_categoria}</p>
                                </div>
                                <div className="ficha-column">
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
                            </div>

                            <h3>Habilidades</h3>
                            {habilidades.map((habilidade, index) => (
                                <div key={index}>
                                    <p>Habilidade: {habilidade.habilidade}</p>
                                    <p>Especialidade: {habilidade.especialidade}</p>
                                </div>
                            ))}

                            <div className={styles.modalActions}>
                                <button onClick={() => setIsEditing(true)}>Editar Ficha</button>
                            </div>

                        </div>
                    ) : (
                        <p>Carregando dados...</p>
                    )
                )};
            </div>
        </div>
    );
};

export default ModalFicha;
