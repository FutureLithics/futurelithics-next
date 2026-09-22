import type { HomepageService } from "./types/service";
import { SERVICE_PATHS } from "./types/service";

const cardRoutes: HomepageService[] = [
    {
      name: "data",
      title: "Data Visualization & Analysis",
      description:
        "Interactive visualizations are invaluable for facilitating effective data exploration, and therefore to an organization's ability to maintain a situational awareness of trends.",
      componentType: "service-directory",
      image: {
        src: "/images/analytics-stock.jpg",
        alt: "Analytics & Insights",
        preprocess: true,
      },
      path: "/services/data-viz",
      type: "active",
      level: 1,
      routes: [
        {
          name: "chart_card",
          title: "D3.js Chart Library",
          componentType: "service-directory",
          image: {
            src: "/images/barCharts.png",
            alt: "Placeholder",
          },
          description:
            "Interactive visualizations are invaluable for facilitating effective data exploration, and therefore to an organization's ability to maintain a situational awareness of trends.",
          path: "/services/data-viz/chart-card",
          type: "active",
          level: 2,
          routes: [
            {
              name: "bar_charts",
              title: "Bar Charts",
              componentType: "chart",
              chart: "bar-chart",
              image: {
                src: "/images/barCharts.png",
                alt: "Placeholder",
              },
              description:
                "Series of Bar charts: single, scaleBand, and stacked.",
              path: "/charts/bar",
              type: "page",
              level: 3,
            },
            {
              name: "line_chart",
              title: "Line Chart",
              componentType: "chart",
              chart: "line-chart",
              image: {
                src: "/images/linechart.jpg",
                alt: "Placeholder",
              },
              description:
                "Customizable line and area charts featuring different curve functions.",
              path: "/charts/line",
              type: "page",
              level: 3,
            },
            {
              name: "pie_chart",
              title: "Pie Chart",
              componentType: "chart",
              chart: "pie-chart",
              image: {
                src: "/images/pie-chart.jpg",
                alt: "Pie and Donut Charts",
              },
              description: "Customizable pie and donut chart.",
              path: "/charts/pie",
              type: "page",
              level: 3,
            },
            {
              name: "myconetwork_chart",
              title: "MycoNetwork Chart",
              componentType: "chart",
              chart: "stratified-network-chart",
              image: {
                src: "/images/mycorrhizalChart.png",
                alt: "Pie and Donut Charts",
              },
              description: "Interactive network chart visualizing mycorrhizal relationships.",
              path: "/charts/myco-network",
              type: "page",
              level: 3,
            },
          ],
        },
        {
          name: "tableau",
          title: "Tableau",
          image: {
            src: "/images/binary-code-image.png",
            alt: "Placeholder",
          },
          componentType: "service-directory",
          description:
            "Click here to check out a collection of live Tableau examples",
          path: "/services/data-viz/tableau",
          type: "active",
          level: 2,
          routes: [
            {
              name: "viz_1",
              title: "Dashboard Example 1",
              image: {
                src: "/images/discount_abuse.jpeg",
                alt: "Discount Abuse",
              },
              description:
                "A dashboard exploring the potential for discount abuse within the ubiquitous Sales dataset.",
              path: "https://public.tableau.com/app/profile/chad8180/viz/PotentialDiscountAbuse/Dashboard1",
              type: "external",
              level: 3,
            },
            {
              name: "viz_2",
              title: "Tableau Story",
              image: {
                src: "/images/FoodAnalysis.jpg",
                alt: "Food item analysis",
              }, 
              description:
                "A Tableau story displaying results from an exploratory analysis of the nutritional composition of various food groups.",
              path: "https://public.tableau.com/app/profile/chad8180/viz/MicronutrientAnalysisbyFoodCategory/BasicFoodcategoryAnalysis",
              type: "external",
              level: 3,
            }, 
            {
              name: "viz_3",
              title: "Dashboard Example 2",
              image: {
                src: "/images/Profitsbyregion.jpg",
                alt: "Profits by Region",
              },
              description:
                "Interactive dashboard visulaizing profits by region. ",
              path: "https://public.tableau.com/app/profile/chad8180/viz/MapProfitandRegion/Map",
              type: "external",
              level: 3,
            },
            {
              name: "viz_4",
              title: "Dashboard Example 3",
              image: {
                src: "/images/globalConflict.jpg",
                alt: "Global conflict Analysis",
              },
              description:
                "Interactive dashboard visualizing various global conflicts from 2018, originally part of Tableau Public #Makeovermonday.",
              path: "https://public.tableau.com/app/profile/chad8180/viz/GlobalConflicts2018/Dashboard1",
              type: "external",
              level: 3,
            },
          ],
        },
      ],
    },
    {
      name: "dev",
      title: "Full Stack Web Development",
      description:
        "End-to-end solutions spanning the entire lifecycle of your application: API design, database administration, and front-end development.",
    componentType: "service-directory",
      image: {
        src: "/images/binary-code-image.png",
        alt: "Binary code on a dark background",
      },
      path: "/services/dev-stack",
      type: "active",
      level: 1,
      routes: [
        {
          name: "node_react",
          title: "Node-Express w/ React",
          image: {
            src: "/images/FutureLithic-Node.jpg",
            alt: "Future Lithics",
            preprocess: true,
          },
          description:
            "This site is built using a Node/Express server with a React.js front end, and a Postgres DB using the Sequelize ORM.",
          path: "/",
          type: "inactive",
          level: 2,
        },
        {
          name: "ruby_rails",
          title: "Ruby on Rails",
          image: {
            src: "/images/RailsLogo.jpg",
            alt: "Ruby Rails",
            preprocess: true,
          },
          description:
            "I have built and worked on multiple Ruby on Rails applications, leveraging Postgres with ActiveRecord, webpacker for integrating Vue and React, and more...",
          path: "/",
          type: "inactive",
          level: 2,
        },
        {
          name: "wordpress",
          title: "Wordpress CMS",
          image: {
            src: "/images/wordpress-stock.jpg",
            alt: "https://pixabay.com/images/id-581849/",
            preprocess: true,
          },
          description:
            "Modern Wordpress theme customization and plugin development.",
          path: "https://blog.futurelithics.com",
          type: "external",
          level: 2,
        },
      ],
    },
    {
      name: "ux",
      title: "UI/UX & Design",
      description:
        "High definition mockups, along with wireframing, information architecture, and basic design services to ensure a seamless experience your site users will love.",
      componentType: "service-directory",
      image: {
        src: "/images/stock-ui-ux.png",
        alt: "UI/UX & Design",
        preprocess: true,
      },
      path: "/services/design",
      type: "active",
      level: 1,
      routes: [
        {
          name: "figma_mockup",
          title: "Mockups w/ Figma",
          image: {
            src: "/images/FigmaMockup.jpg",
            alt: "Mockup for Future Lithics with Figma",
          },
          description:
            "Figma is an excellent tool for quickly producing high quality site mockups.",
          type: "inactive",
          path: "/",
          level: 2,
        },
        {
          name: "wireframing",
          title: "Wireframing",
          image: {
            src: "https://lyricitriade.com/wp-content/uploads/Wireframe1-4-01-2048x1525.png",
            alt: "Wireframing | LyriciTriade",
            preprocess: true,
          },
          description:
            "High quality wireframes can aid visualizing the elements of an application UI before worrying about styling elements such as color.",
          path: "https://lyricitriade.com/a-journey-in-product-development-part-2-decisions-and-wireframes/",
          type: "external",
          level: 2,
        },
        {
          name: "prototyping",
          title: "Clickable Prototype (Adobe XD)",
          image: {
            src: "https://lyricitriade.com/wp-content/uploads/Screen-Shot-2021-01-11-at-6.00.25-PM.jpg",
            alt: "Clickable Prototype | LyriciTriade",
            preprocess: true,
          },
          description:
            "Having a clickable prototype can give clients a feel for how the application will work before the coding begins.",
          path: "https://xd.adobe.com/view/0dec45e4-7c0d-492c-8704-30b6949345f9-58bf/",
          type: "external",
          level: 2,
        },
        {
          name: "content_mapping",
          title: "Content Mapping",
          image: {
            src: "https://lyricitriade.com/wp-content/uploads/Spectrifact-Cmap.jpg",
            alt: "Content Mapping | LyriciTriade",
            preprocess: true,
          },
          description:
            "Content mapping is an important first step when deciding the proper flow of a user's experience.",
          path: "https://lyricitriade.com/a-journey-in-product-development-part-1-ideation-and-content-mapping/",
          type: "external",
          level: 2,
        },
      ],
    },
    {
      name: "product-engineering",
      title: "Product Engineering",
      description:
        "Own product delivery from idea through production, from discovery and MVP development to deployment and long-term maintainability.",
      componentType: "service-landing",
      image: {
        src: "/images/product-engineering.jpg",
        alt: "Product team reviewing interface sketches and system diagrams on screen",
        preprocess: true,
      },
      path: SERVICE_PATHS.PRODUCT_ENGINEERING,
      type: "active",
      level: 1,
      routes: [],
    },
    {
      name: "legacy-app-modernization",
      title: "Legacy App Modernization",
      description:
        "Improve aging systems safely and incrementally without unnecessary rebuilds, through frontend modernization, dependency upgrades, and reliable migration paths.",
      componentType: "service-landing",
      image: {
        src: "/images/legacy-app-modernization.jpg",
        alt: "Legacy software interface transitioning to a modern application layout",
        preprocess: true,
      },
      path: SERVICE_PATHS.LEGACY_APP_MODERNIZATION,
      type: "active",
      level: 1,
      routes: [],
    },
    {
      name: "ai-workflow-automation",
      title: "AI & Workflow Automation",
      description:
        "Automate repetitive processes and connect systems, with human review where judgment matters and deterministic workflows where they fit better.",
      componentType: "service-landing",
      image: {
        src: "/images/ai-workflow-automation.jpg",
        alt: "Documents and data flowing between connected business systems with a review checkpoint",
        preprocess: true,
      },
      path: SERVICE_PATHS.AI_WORKFLOW_AUTOMATION,
      type: "active",
      level: 1,
      routes: [],
    },
    {
      name: "software-architecture",
      title: "Software Architecture",
      description:
        "Design maintainable systems around real requirements, with modular boundaries, integration patterns, and structures that scale with the product.",
      componentType: "service-landing",
      image: {
        src: "/images/software-architecture.jpg",
        alt: "Modular structural framework suggesting layered software architecture",
        preprocess: true,
      },
      path: SERVICE_PATHS.SOFTWARE_ARCHITECTURE,
      type: "active",
      level: 1,
      routes: [],
    },
    {
      name: "business-systems",
      title: "Business Systems",
      description:
        "Connect operational tools, data, and workflows so teams can run on coherent systems instead of scattered spreadsheets and siloed apps.",
      componentType: "service-landing",
      image: {
        src: "/images/business-systems.jpg",
        alt: "Operational dashboards, documents, and tools converging into one system",
        preprocess: true,
      },
      path: SERVICE_PATHS.BUSINESS_SYSTEMS,
      type: "active",
      level: 1,
      routes: [],
    },
    {
      name: "technical-strategy",
      title: "Technical Strategy",
      description:
        "Convert business goals into a practical technical plan: roadmaps, architecture decisions, and priorities grounded in what the organization can actually ship.",
      componentType: "service-landing",
      image: {
        src: "/images/technical-strategy.jpg",
        alt: "Technical strategist reviewing roadmap and architecture options at a desk",
        preprocess: true,
      },
      path: SERVICE_PATHS.TECHNICAL_STRATEGY,
      type: "active",
      level: 1,
      routes: [],
    },
  ];

export default cardRoutes;
export { cardRoutes as homepageServices };