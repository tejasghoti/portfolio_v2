import {
    SiHtml5, SiCss3, SiPython, SiCplusplus, SiC, SiFastapi, SiDjango, SiFlask,
    SiMysql, SiPostgresql, SiScikitlearn, SiTensorflow, SiPytorch,
    SiKaggle, SiGooglecolab, SiUbuntu, SiBrave, SiSpotify, SiGithub,
    SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiFramer,
    SiNumpy, SiPandas, SiScipy, SiJavascript, SiPydantic,
    SiGooglegemini, SiOpenai, SiMeta, SiKubernetes, SiDocker,
    SiMongodb, SiRedis, SiAmazonwebservices, SiLangchain, SiOpencv,
    SiNodedotjs, SiExpress, SiRabbitmq, SiCloudflare, SiNginx, SiFirebase,
    SiAnthropic
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FiCpu, FiSearch, FiShield, FiDatabase, FiServer, FiLayers } from "react-icons/fi";
import { IconType } from "react-icons";

export const techStackIcons: Record<string, IconType> = {
    "HTML": SiHtml5,
    "HTML5": SiHtml5,
    "CSS": SiCss3,
    "CSS3": SiCss3,
    "Python": SiPython,
    "C": SiC,
    "C++": SiCplusplus,
    "FastAPI": SiFastapi,
    "Django": SiDjango,
    "Flask": SiFlask,
    "MySQL": SiMysql,
    "PostgreSQL": SiPostgresql,
    "Postgres": SiPostgresql,
    "MongoDB": SiMongodb,
    "Redis": SiRedis,
    "Scikit-learn": SiScikitlearn,
    "TensorFlow": SiTensorflow,
    "PyTorch": SiPytorch,
    "Kaggle": SiKaggle,
    "Colab": SiGooglecolab,
    "VS Code": VscVscode,
    "Ubuntu": SiUbuntu,
    "Brave": SiBrave,
    "Spotify": SiSpotify,
    "Perplexity": FiSearch,
    "GitHub": SiGithub,
    "Next": SiNextdotjs,
    "Next.js": SiNextdotjs,
    "React": SiReact,
    "Tailwind CSS": SiTailwindcss,
    "TypeScript": SiTypescript,
    "Framer Motion": SiFramer,
    "Numpy": SiNumpy,
    "Pandas": SiPandas,
    "Scipy": SiScipy,
    "JS": SiJavascript,
    "JavaScript": SiJavascript,
    "SQL": SiMysql,
    "Pydantic": SiPydantic,
    "Kubernetes": SiKubernetes,
    "Docker": SiDocker,
    "AWS": SiAmazonwebservices,
    "LangGraph": SiLangchain,
    "LangChain": SiLangchain,
    "Claude 3.5 Sonnet": SiAnthropic,
    "Aider": FiCpu,
    "MCP": FiServer,
    "OpenCV": SiOpencv,
    "YOLOv5": FiCpu,
    "Tesseract OCR": FiSearch,
    "spaCy": FiCpu,
    "Microsoft Presidio": FiShield,
    "NER": FiSearch,
    "Privacy-Preserving AI": FiShield,
    "RAG": FiLayers,
    "Vector Search": FiSearch,
    "Vector Retrieval": FiSearch,
    "LLMs": FiCpu,
    "NLP": FiSearch,
    "Node.js": SiNodedotjs,
    "Express": SiExpress,
    "NGINX": SiNginx,
    "Cloudflare CDN": SiCloudflare,
    "RabbitMQ": SiRabbitmq,
    "Firebase": SiFirebase
};

export const techStackUrls: Record<string, string> = {
    "HTML": "https://developer.mozilla.org/en-US/docs/Web/HTML",
    "HTML5": "https://developer.mozilla.org/en-US/docs/Web/HTML",
    "CSS": "https://developer.mozilla.org/en-US/docs/Web/CSS",
    "CSS3": "https://developer.mozilla.org/en-US/docs/Web/CSS",
    "Python": "https://www.python.org/",
    "C": "https://en.cppreference.com/w/c",
    "C++": "https://isocpp.org/",
    "FastAPI": "https://fastapi.tiangolo.com/",
    "Django": "https://www.djangoproject.com/",
    "Flask": "https://flask.palletsprojects.com/",
    "MySQL": "https://www.mysql.com/",
    "PostgreSQL": "https://www.postgresql.org/",
    "Postgres": "https://www.postgresql.org/",
    "MongoDB": "https://www.mongodb.com/",
    "Redis": "https://redis.io/",
    "Scikit-learn": "https://scikit-learn.org/",
    "TensorFlow": "https://www.tensorflow.org/",
    "PyTorch": "https://pytorch.org/",
    "Kaggle": "https://www.kaggle.com/",
    "Colab": "https://colab.research.google.com/",
    "VS Code": "https://code.visualstudio.com/",
    "Ubuntu": "https://ubuntu.com/",
    "Brave": "https://brave.com/",
    "Spotify": "https://open.spotify.com/",
    "Perplexity": "https://www.perplexity.ai/",
    "GitHub": "https://github.com/",
    "Next": "https://nextjs.org/",
    "Next.js": "https://nextjs.org/",
    "React": "https://react.dev/",
    "Tailwind CSS": "https://tailwindcss.com/",
    "TypeScript": "https://www.typescriptlang.org/",
    "Framer Motion": "https://www.framer.com/motion/",
    "Numpy": "https://numpy.org/",
    "Pandas": "https://pandas.pydata.org/",
    "Scipy": "https://scipy.org/",
    "JS": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    "JavaScript": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    "Pydantic": "https://docs.pydantic.dev/",
    "Kubernetes": "https://kubernetes.io/",
    "Docker": "https://www.docker.com/",
    "AWS": "https://aws.amazon.com/",
    "LangGraph": "https://www.langchain.com/langgraph",
    "LangChain": "https://www.langchain.com/",
    "OpenCV": "https://opencv.org/",
    "Node.js": "https://nodejs.org/",
    "Firebase": "https://firebase.google.com/",
    "Cloudflare CDN": "https://www.cloudflare.com/",
    "RabbitMQ": "https://www.rabbitmq.com/"
};

export const techStackData = [
    {
        category: "Languages", items: [
            { name: "Python", icon: SiPython, url: "https://www.python.org/", color: "hover:text-yellow-400" },
            { name: "C++", icon: SiCplusplus, url: "https://isocpp.org/", color: "hover:text-blue-600" },
            { name: "C", icon: SiC, url: "https://en.cppreference.com/w/c", color: "hover:text-blue-400" },
            { name: "JavaScript", icon: SiJavascript, url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", color: "hover:text-yellow-300" }
        ]
    },
    {
        category: "AI / ML & Vision", items: [
            { name: "LangChain", icon: SiLangchain, url: "https://www.langchain.com/", color: "hover:text-emerald-400" },
            { name: "PyTorch", icon: SiPytorch, url: "https://pytorch.org/", color: "hover:text-red-500" },
            { name: "OpenCV", icon: SiOpencv, url: "https://opencv.org/", color: "hover:text-green-500" },
            { name: "Scikit-learn", icon: SiScikitlearn, url: "https://scikit-learn.org/", color: "hover:text-orange-400" }
        ]
    },
    {
        category: "Backend & Systems", items: [
            { name: "FastAPI", icon: SiFastapi, url: "https://fastapi.tiangolo.com/", color: "hover:text-teal-400" },
            { name: "Node.js", icon: SiNodedotjs, url: "https://nodejs.org/", color: "hover:text-green-600" },
            { name: "PostgreSQL", icon: SiPostgresql, url: "https://www.postgresql.org/", color: "hover:text-blue-300" },
            { name: "Redis", icon: SiRedis, url: "https://redis.io/", color: "hover:text-red-600" }
        ]
    },
    {
        category: "DevOps & Cloud", items: [
            { name: "Docker", icon: SiDocker, url: "https://www.docker.com/", color: "hover:text-blue-400" },
            { name: "Kubernetes", icon: SiKubernetes, url: "https://kubernetes.io/", color: "hover:text-blue-500" },
            { name: "AWS", icon: SiAmazonwebservices, url: "https://aws.amazon.com/", color: "hover:text-orange-500" },
            { name: "MongoDB", icon: SiMongodb, url: "https://www.mongodb.com/", color: "hover:text-green-500" }
        ]
    }
];

export const toolkitData = [
    { name: "VS Code", icon: VscVscode, url: "https://code.visualstudio.com/", color: "text-blue-500" },
    { name: "Terminal", icon: SiUbuntu, url: "https://ubuntu.com/", color: "text-orange-500" },
    { name: "Docker", icon: SiDocker, url: "https://www.docker.com/", color: "text-blue-400" },
    { name: "Kubernetes", icon: SiKubernetes, url: "https://kubernetes.io/", color: "text-blue-500" },
    { name: "AWS", icon: SiAmazonwebservices, url: "https://aws.amazon.com/", color: "text-orange-500" },
    { name: "GitHub", icon: SiGithub, url: "https://github.com/", color: "text-foreground" }
];
