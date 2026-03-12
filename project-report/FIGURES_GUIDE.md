# 🖼️ How to Add Figures in LaTeX Report

## 📋 List of Figures Kya Hai?

**List of Figures** ek automatic list hai jo report mein add kiye gaye sab images/diagrams ko show karti hai with page numbers.

---

## 🎯 Kaise Kaam Karta Hai:

### Step 1: Image Upload (Overleaf mein)
1. Overleaf project mein "Upload" button click karo
2. Image file select karo (PNG, JPG, PDF)
3. Upload ho jayega

### Step 2: LaTeX Code Mein Add Karo

```latex
\begin{figure}[h]
    \centering
    \includegraphics[width=0.8\textwidth]{image_name.png}
    \caption{System Architecture Diagram}
    \label{fig:architecture}
\end{figure}
```

### Step 3: List of Figures Enable Karo

Document mein ye line uncomment karo:
```latex
\listoffigures
```

### Step 4: Compile Karo
- Overleaf mein "Recompile" button click karo
- List of Figures automatically generate ho jayegi

---

## 📊 Recommended Figures for Your Project:

### 1. System Architecture Diagram
```latex
\begin{figure}[h]
    \centering
    \includegraphics[width=0.9\textwidth]{architecture.png}
    \caption{Three-Layer System Architecture}
    \label{fig:architecture}
\end{figure}
```

### 2. Database Schema
```latex
\begin{figure}[h]
    \centering
    \includegraphics[width=0.85\textwidth]{database_schema.png}
    \caption{MongoDB Collections and Relationships}
    \label{fig:database}
\end{figure}
```

### 3. User Interface Screenshot
```latex
\begin{figure}[h]
    \centering
    \includegraphics[width=0.9\textwidth]{user_interface.png}
    \caption{User Search Interface with Map Integration}
    \label{fig:ui}
\end{figure}
```

### 4. Admin Dashboard
```latex
\begin{figure}[h]
    \centering
    \includegraphics[width=0.9\textwidth]{admin_dashboard.png}
    \caption{Admin Dashboard with Real-Time Statistics}
    \label{fig:admin}
\end{figure}
```

### 5. Heatmap Visualization
```latex
\begin{figure}[h]
    \centering
    \includegraphics[width=0.85\textwidth]{heatmap.png}
    \caption{Business Density Heatmap}
    \label{fig:heatmap}
\end{figure}
```

### 6. ML Ranking Flow
```latex
\begin{figure}[h]
    \centering
    \includegraphics[width=0.8\textwidth]{ml_ranking.png}
    \caption{Machine Learning Ranking Algorithm Workflow}
    \label{fig:ml}
\end{figure}
```

### 7. API Documentation
```latex
\begin{figure}[h]
    \centering
    \includegraphics[width=0.9\textwidth]{api_docs.png}
    \caption{Swagger API Documentation Interface}
    \label{fig:api}
\end{figure}
```

### 8. WebSocket Flow
```latex
\begin{figure}[h]
    \centering
    \includegraphics[width=0.8\textwidth]{websocket_flow.png}
    \caption{Real-Time WebSocket Communication Flow}
    \label{fig:websocket}
\end{figure}
```

---

## 🎨 Figure Options:

### Width Control:
```latex
\includegraphics[width=0.5\textwidth]{image.png}  % 50% width
\includegraphics[width=0.8\textwidth]{image.png}  % 80% width
\includegraphics[width=\textwidth]{image.png}     % 100% width
```

### Height Control:
```latex
\includegraphics[height=5cm]{image.png}
```

### Position:
```latex
[h]  % here (preferred)
[t]  % top of page
[b]  % bottom of page
[p]  % separate page
[H]  % exactly here (needs \usepackage{float})
```

---

## 📝 How to Reference Figures in Text:

```latex
As shown in Figure \ref{fig:architecture}, the system follows...

The database schema (see Figure \ref{fig:database}) consists of...
```

---

## ✅ Complete Example:

```latex
\chapter{System Architecture}

The proposed system follows a three-layer architecture as illustrated in Figure \ref{fig:architecture}.

\begin{figure}[h]
    \centering
    \includegraphics[width=0.85\textwidth]{architecture.png}
    \caption{Three-Layer System Architecture}
    \label{fig:architecture}
\end{figure}

The presentation layer handles user interactions, while the application layer processes business logic.
```

---

## 🎯 List of Figures Output:

When you compile, it will show:

```
List of Figures

Figure 1.1: Three-Layer System Architecture ............... 15
Figure 2.1: MongoDB Collections and Relationships ......... 23
Figure 3.1: User Search Interface ......................... 31
Figure 4.1: Admin Dashboard ............................... 42
Figure 5.1: Business Density Heatmap ...................... 48
```

---

## 💡 Tips:

1. **Image Quality:** Use high-resolution images (300 DPI)
2. **File Format:** PNG or PDF preferred
3. **File Size:** Keep under 5MB per image
4. **Naming:** Use descriptive names (architecture.png, not img1.png)
5. **Captions:** Write clear, descriptive captions
6. **Labels:** Use consistent naming (fig:name)

---

## 🚫 Common Mistakes:

❌ Wrong: `\includegraphics{C:\Users\Desktop\image.png}`
✅ Right: `\includegraphics{image.png}`

❌ Wrong: No caption
✅ Right: Always add \caption{}

❌ Wrong: No label
✅ Right: Always add \label{fig:name}

---

## 📦 Recommended Images to Add:

### Must Have (Priority 1):
1. ✅ System Architecture Diagram
2. ✅ Database Schema
3. ✅ User Interface Screenshot

### Should Have (Priority 2):
4. ✅ Admin Dashboard
5. ✅ ML Ranking Flowchart
6. ✅ API Documentation

### Nice to Have (Priority 3):
7. ✅ Heatmap Visualization
8. ✅ WebSocket Flow Diagram
9. ✅ Mobile Responsive View
10. ✅ Use Case Diagram

---

## 🎓 For Your Project:

### Abhi Kya Karo:

1. **Screenshots Lo:**
   - User app (http://localhost:8000)
   - Admin dashboard (http://localhost:8000/admin.html)
   - API docs (http://localhost:5000/docs)
   - Heatmap view

2. **Diagrams Banao:**
   - Architecture diagram (draw.io, Lucidchart)
   - Database schema (dbdiagram.io)
   - Flowcharts (draw.io)

3. **Upload in Overleaf:**
   - All images upload karo
   - LaTeX code mein add karo
   - Compile karo

4. **Enable List of Figures:**
   - Uncomment `\listoffigures` line
   - Recompile

---

## ✨ Result:

Aapki report professional dikhegi with:
- ✅ Proper figures
- ✅ Automatic numbering
- ✅ List of Figures page
- ✅ Easy references in text

---

**Happy Report Writing!** 📄🖼️✨
