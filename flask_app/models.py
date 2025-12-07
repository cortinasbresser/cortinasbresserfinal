from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Lead(db.Model):
    __tablename__ = 'leads'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    telefone = db.Column(db.String(20), nullable=False)
    largura_parede = db.Column(db.Float, nullable=True)
    altura_parede = db.Column(db.Float, nullable=True)
    largura_janela = db.Column(db.Float, nullable=True)
    altura_janela = db.Column(db.Float, nullable=True)
    tecido = db.Column(db.String(50), nullable=False)
    instalacao = db.Column(db.String(50), nullable=False)
    observacoes = db.Column(db.Text, nullable=True)
    endereco = db.Column(db.Text, nullable=False)
    criado_em = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Lead {self.nome}>'
