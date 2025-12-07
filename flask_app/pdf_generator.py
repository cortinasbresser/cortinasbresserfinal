from io import BytesIO
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.units import cm
from datetime import datetime

def generate_orcamento_pdf(lead):
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4, rightMargin=2*cm, leftMargin=2*cm, topMargin=2*cm, bottomMargin=2*cm)
    
    styles = getSampleStyleSheet()
    elements = []

    # --- Header ---
    # Title
    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#2c3e50'),
        alignment=1, # Center
        spaceAfter=20
    )
    elements.append(Paragraph("Orçamento de Cortinas", title_style))
    elements.append(Spacer(1, 12))

    # Date and ID
    info_style = ParagraphStyle(
        'InfoStyle',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.gray,
        alignment=2 # Right
    )
    date_str = datetime.now().strftime("%d/%m/%Y")
    elements.append(Paragraph(f"Data: {date_str} | Orçamento #: {lead.id}", info_style))
    elements.append(Spacer(1, 20))

    # --- Client Data Table ---
    elements.append(Paragraph("Dados do Cliente", styles['Heading2']))
    elements.append(Spacer(1, 6))

    client_data = [
        ["Nome:", lead.nome],
        ["Telefone:", lead.telefone],
        ["Endereço:", lead.endereco]
    ]

    t_client = Table(client_data, colWidths=[4*cm, 12*cm])
    t_client.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#ecf0f1')),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.lightgrey),
    ]))
    elements.append(t_client)
    elements.append(Spacer(1, 20))

    # --- Specifications Table ---
    elements.append(Paragraph("Especificações e Medidas", styles['Heading2']))
    elements.append(Spacer(1, 6))

    specs_data = [
        ["Item", "Detalhe"],
        ["Tecido", lead.tecido],
        ["Tipo de Instalação", lead.instalacao],
        ["Largura Parede", f"{lead.largura_parede} m" if lead.largura_parede else "-"],
        ["Altura Parede", f"{lead.altura_parede} m" if lead.altura_parede else "-"],
        ["Largura Janela", f"{lead.largura_janela} m" if lead.largura_janela else "-"],
        ["Altura Janela", f"{lead.altura_janela} m" if lead.altura_janela else "-"],
    ]

    t_specs = Table(specs_data, colWidths=[6*cm, 10*cm])
    t_specs.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (1, 0), colors.HexColor('#3498db')),
        ('TEXTCOLOR', (0, 0), (1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f9f9f9')])
    ]))
    elements.append(t_specs)
    elements.append(Spacer(1, 20))

    # --- Observations ---
    if lead.observacoes:
        elements.append(Paragraph("Observações", styles['Heading2']))
        elements.append(Spacer(1, 6))
        elements.append(Paragraph(lead.observacoes, styles['Normal']))
        elements.append(Spacer(1, 20))

    # --- Footer ---
    elements.append(Spacer(1, 40))
    footer_text = "Obrigado por escolher a Cortinas Bresser! Entre em contato para dúvidas."
    elements.append(Paragraph(footer_text, ParagraphStyle('Footer', parent=styles['Normal'], alignment=1, textColor=colors.grey)))

    doc.build(elements)
    buffer.seek(0)
    return buffer
