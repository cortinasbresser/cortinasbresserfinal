# 📸 Especificações de Imagens - Hero Carousel

## 🎯 **TAMANHO IDEAL DAS IMAGENS DO HERO:**

### **Resolução Recomendada:**
- **Largura:** 1920px
- **Altura:** 600px
- **Proporção:** 16:5 (widescreen)
- **Formato:** JPG ou WebP
- **Qualidade:** 80-90%
- **Tamanho do arquivo:** Máximo 300KB

---

## 📐 **TAMANHOS POR DISPOSITIVO:**

| Dispositivo | Largura | Altura | Uso |
|-------------|---------|--------|-----|
| **Desktop 4K** | 3840px | 1200px | Opcional |
| **Desktop Full HD** | 1920px | 600px | **Recomendado** |
| **Laptop** | 1366px | 427px | Fallback |
| **Tablet** | 1024px | 500px | Fallback |
| **Mobile** | 768px | 400px | Fallback |

---

## 🎨 **ESPECIFICAÇÕES TÉCNICAS:**

### **Formato:**
- **Primário:** JPG (melhor compressão)
- **Alternativo:** WebP (menor tamanho)
- **Evitar:** PNG (muito grande)

### **Qualidade:**
```
- Exportar em 85% de qualidade
- Usar compressão progressiva
- Otimizar com TinyPNG ou similar
```

### **Cores:**
- **Espaço de cor:** sRGB
- **Profundidade:** 8 bits
- **Perfil:** sRGB IEC61966-2.1

---

## 📁 **ESTRUTURA DE ARQUIVOS:**

```
public/
└── assets/
    ├── hero/
    │   ├── banner1.jpg (1920x600)
    │   ├── banner2.jpg (1920x600)
    │   ├── banner3.jpg (1920x600)
    │   ├── banner1-mobile.jpg (768x400) [opcional]
    │   ├── banner2-mobile.jpg (768x400) [opcional]
    │   └── banner3-mobile.jpg (768x400) [opcional]
    └── cortinasbresser.svg
```

---

## 🎯 **COMO CRIAR IMAGENS OTIMIZADAS:**

### **Opção 1: Photoshop**
```
1. Criar novo documento: 1920x600px
2. Adicionar imagem/design
3. File > Export > Save for Web
4. Formato: JPEG
5. Qualidade: 85%
6. Progressivo: Sim
7. Salvar
```

### **Opção 2: GIMP (Grátis)**
```
1. Criar novo: 1920x600px
2. Adicionar conteúdo
3. File > Export As
4. Escolher JPEG
5. Qualidade: 85
6. Salvar
```

### **Opção 3: Online (TinyPNG)**
```
1. Criar imagem 1920x600px
2. Acessar tinypng.com
3. Upload da imagem
4. Download otimizada
```

---

## 🎨 **DICAS DE COMPOSIÇÃO:**

### **Área Segura para Texto:**
```
┌─────────────────────────────────┐
│ [Margem 100px]                  │
│                                 │
│   ┌─────────────────────┐       │
│   │                     │       │
│   │  TEXTO AQUI         │       │
│   │  (Área Segura)      │       │
│   │                     │       │
│   └─────────────────────┘       │
│                                 │
│ [Margem 100px]                  │
└─────────────────────────────────┘
```

### **Posicionamento:**
- **Texto:** Centralizado ou à esquerda
- **Margem lateral:** Mínimo 100px
- **Margem vertical:** Mínimo 80px
- **Evitar:** Texto nos cantos

---

## 🌟 **OVERLAY E GRADIENTE:**

O hero já tem overlay automático para melhorar legibilidade:

```css
background: linear-gradient(
  135deg,
  rgba(0, 0, 0, 0.7) 0%,
  rgba(0, 0, 0, 0.4) 50%,
  rgba(0, 0, 0, 0.7) 100%
);
```

**Dica:** Use imagens mais claras, o overlay escurecerá automaticamente.

---

## 📊 **PERFORMANCE:**

### **Tamanho Ideal do Arquivo:**
- **Desktop (1920x600):** 150-300KB
- **Mobile (768x400):** 80-150KB

### **Otimização:**
```bash
# Usando ImageMagick
convert banner.jpg -quality 85 -strip banner-optimized.jpg

# Usando cwebp (WebP)
cwebp -q 85 banner.jpg -o banner.webp
```

---

## 🎯 **IMAGENS ATUAIS NO PROJETO:**

### **Configuradas:**
```typescript
// components/HeroCarousel.tsx
const slides = [
  {
    image: '/assets/banner1.jpg', // 1920x600
    title: 'Cortinas Sob Medida',
    subtitle: 'Elegância e Sofisticação',
    description: '...'
  },
  // Mais 2 slides...
];
```

### **Para Adicionar:**
1. Crie 3 imagens: `banner1.jpg`, `banner2.jpg`, `banner3.jpg`
2. Tamanho: 1920x600px
3. Salve em: `public/assets/`
4. O carousel usará automaticamente

---

## 🎨 **SUGESTÕES DE CONTEÚDO:**

### **Banner 1: Cortinas Sob Medida**
- Imagem de cortina elegante em sala
- Foco em detalhes do tecido
- Iluminação natural

### **Banner 2: Tecidos Premium**
- Close-up de diferentes tecidos
- Texturas visíveis
- Cores variadas

### **Banner 3: Instalação**
- Profissional instalando cortina
- Ambiente moderno
- Resultado final

---

## 📱 **RESPONSIVIDADE:**

### **Desktop (1920x600):**
```css
.hero-carousel {
  height: 600px;
}
```

### **Tablet (768-1023):**
```css
.hero-carousel {
  height: 500px;
}
```

### **Mobile (0-767):**
```css
.hero-carousel {
  height: 300-400px;
}
```

**Nota:** A imagem escala automaticamente usando `object-fit: cover`

---

## 🔧 **COMO TROCAR AS IMAGENS:**

### **Passo 1:** Preparar Imagens
```
- Criar 3 imagens 1920x600px
- Nomear: banner1.jpg, banner2.jpg, banner3.jpg
- Otimizar (TinyPNG)
```

### **Passo 2:** Copiar para Projeto
```bash
# Copiar para public/assets/
cp banner1.jpg public/assets/
cp banner2.jpg public/assets/
cp banner3.jpg public/assets/
```

### **Passo 3:** Atualizar Código
```typescript
// components/HeroCarousel.tsx
const slides: Slide[] = [
  {
    image: '/assets/banner1.jpg', // ✅
    title: 'Seu Título',
    subtitle: 'Seu Subtítulo',
    description: 'Sua Descrição'
  },
  {
    image: '/assets/banner2.jpg', // ✅
    title: 'Título 2',
    subtitle: 'Subtítulo 2',
    description: 'Descrição 2'
  },
  {
    image: '/assets/banner3.jpg', // ✅
    title: 'Título 3',
    subtitle: 'Subtítulo 3',
    description: 'Descrição 3'
  }
];
```

---

## ✅ **CHECKLIST:**

- [ ] Criar 3 imagens 1920x600px
- [ ] Otimizar com TinyPNG
- [ ] Salvar em `public/assets/`
- [ ] Atualizar textos em `HeroCarousel.tsx`
- [ ] Testar em desktop
- [ ] Testar em mobile
- [ ] Verificar legibilidade dos textos

---

## 🎉 **RESULTADO ESPERADO:**

Com imagens corretas (1920x600px):
- ✅ Carregamento rápido
- ✅ Qualidade perfeita
- ✅ Textos legíveis
- ✅ Responsivo em todos os dispositivos
- ✅ Performance otimizada

---

**Tamanho Ideal:** 1920x600px (16:5)  
**Formato:** JPG com 85% qualidade  
**Tamanho do arquivo:** 150-300KB  
**Localização:** `public/assets/banner1.jpg`

---

**Criado em:** 2025-11-21  
**Status:** 📐 Especificações Completas
