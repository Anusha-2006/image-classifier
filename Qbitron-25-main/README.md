# 🧠 AI Image Classifier

An advanced web application that leverages cutting-edge machine learning to classify images in real-time. Built with React, TensorFlow.js, and powered by the MobileNet convolutional neural network, this app can identify over 1000 different object categories with impressive accuracy.

![AI Image Classifier](https://img.shields.io/badge/React-18.3.1-blue) ![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.22.0-orange) ![Supabase](https://img.shields.io/badge/Supabase-2.57.4-green) ![Vite](https://img.shields.io/badge/Vite-5.4.2-purple)

## ✨ Features

- **Real-time Image Classification**: Upload images and get instant predictions using MobileNet CNN
- **High Accuracy**: Trained on ImageNet dataset with 1000+ categories
- **Interactive UI**: Modern, responsive design with smooth animations
- **Classification History**: Track all your previous classifications
- **Performance Metrics**: Detailed confidence scores and processing times
- **Cloud Storage**: Persistent data storage with Supabase
- **Statistics Dashboard**: Overview of classification patterns and trends

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- GitHub account (for repository hosting)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-image-classifier.git
   cd ai-image-classifier
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase (Optional)**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key to `src/lib/supabase.ts`
   - Run the migration in `supabase/migrations/` to create the classifications table

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5174` to see the app in action!

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Machine Learning**: TensorFlow.js with MobileNet model
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 📁 Project Structure

```
src/
├── components/
│   ├── ImageUploader.tsx      # File upload and preview
│   ├── PredictionResults.tsx  # Classification results display
│   ├── MetricsDisplay.tsx     # Performance metrics
│   ├── ClassificationHistory.tsx # History of classifications
│   └── StatsOverview.tsx      # Statistics dashboard
├── hooks/
│   └── useImageClassifier.ts  # ML model integration
├── lib/
│   └── supabase.ts           # Database configuration
├── App.tsx                   # Main application component
└── main.tsx                  # Application entry point
```

## 🎯 How It Works

1. **Model Loading**: The app loads the pre-trained MobileNet model from TensorFlow.js
2. **Image Processing**: Uploaded images are preprocessed for the neural network
3. **Inference**: The CNN analyzes the image and outputs probability scores for each category
4. **Results Display**: Top predictions are shown with confidence percentages
5. **Data Persistence**: Classification results are stored in Supabase for history tracking

## 📊 Performance Metrics

- **Model Size**: ~17MB (MobileNet v2)
- **Inference Time**: ~100-500ms per image
- **Accuracy**: Top-1: 71.0%, Top-5: 90.0% (ImageNet validation)
- **Categories**: 1000+ object classes

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

### Environment Variables

Create a `.env.local` file for Supabase configuration:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🌟 Key Components

### ImageUploader
Handles file selection, drag-and-drop, and image preview with validation.

### PredictionResults
Displays classification results in an intuitive, sortable list with confidence bars.

### MetricsDisplay
Shows detailed performance metrics including processing time and model confidence.

### ClassificationHistory
Maintains a persistent log of all classifications with search and filter capabilities.

### StatsOverview
Provides high-level statistics and trends from classification data.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TensorFlow.js Team** for the amazing ML library
- **Google AI** for the MobileNet model
- **Supabase** for the excellent backend-as-a-service
- **Tailwind CSS** for the utility-first styling framework

## 📞 Support

If you find this project helpful, please give it a ⭐️ on GitHub!

For questions or issues, open an issue on the GitHub repository.

---

*Built with ❤️ using modern web technologies and artificial intelligence*
