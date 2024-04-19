# LEARN.md

## Introduction

The Cryptocurrency Order Book App is a web application built using the T3 Stack, which includes React, Next.js, TailwindCSS, tRPC, Prisma, and PostgreSQL. This app displays live data for 5 cryptocurrencies (BTC, ETH, XRP, LTC, DOGE) and allows users to create a watchlist to track their favorite cryptocurrencies. Users can also view historical data and detailed information for individual cryptocurrencies.

## Key Takeaways

1. **TypeScript**: Using TypeScript provides type safety, which is particularly beneficial for handling the well-defined schema of the WebSocket payload.

2. **React and Next.js**: React's component-based architecture and Next.js's server-side rendering (SSR) capabilities make them a powerful combination for building a real-time, data-driven web application.

3. **TailwindCSS**: Utilizing a utility-first CSS framework like TailwindCSS enables rapid development of responsive and visually appealing user interfaces.

4. **tRPC**: tRPC's type-safe API design, efficient real-time data handling, and tight integration with TypeScript make it a great choice for building the application's API layer.

5. **Prisma and PostgreSQL**: Prisma's ORM and PostgreSQL's reliability provide a robust and type-safe data storage solution for the application's watchlist data.

6. **UI Libraries**: Leveraging UI libraries like SHADCN and Ant Design can help create a consistent and visually appealing user experience.

7. **Custom Hooks**: Using a custom hooks library like useHooks can improve code reusability and maintainability.

8. **Date and Time Handling**: Libraries like DayJS simplify the process of working with dates and times, which is crucial for displaying historical cryptocurrency data.

9. **Icon Library**: Integrating an icon library like Phosphor Icons can enhance the visual appeal and consistency of the application.

10. **Husky, Prettier, and ESLint**: These tools were used to enforce code quality standards and maintain a consistent codebase.

-   **Husky**: A Git hook library that allows you to run scripts before certain Git events, such as commit or push. This helps ensure that code meets the project's quality standards before it's committed.
-   **Prettier**: An opinionated code formatter that automatically formats the code to a consistent style, reducing the time spent on manual formatting and improving code readability.
-   **ESLint**: A pluggable linting utility for JavaScript and TypeScript that helps identify and fix problematic patterns in the code. This ensures that the codebase adheres to best practices and coding standards.

## Key Lessons Learned

1. **Handling Real-Time Data**: Efficiently processing and displaying live data updates from a WebSocket connection requires careful consideration of performance and latency. Throttling the data can be a necessary step to ensure a smooth user experience.

2. **Assumptions and Limitations**: When working with real-world data sources, it's important to be aware of potential limitations and make reasonable assumptions to address them. In this case, the high rate of data being sent by the WebSocket required throttling to ensure the application could handle the load.

3. **Importance of Type Safety**: The use of TypeScript throughout the application, including in the tRPC API definitions, demonstrates the benefits of type safety for maintaining code quality, reducing errors, and improving developer productivity.

4. **Modular and Extensible Architecture**: The application's use of tRPC's modular and extensible architecture suggests that this approach can be beneficial for building scalable and maintainable applications, especially as the codebase grows in complexity.

5. **Comprehensive Testing**: The type-safe nature of tRPC and its clear API boundaries facilitate the creation of comprehensive tests, which is crucial for ensuring the reliability and robustness of a real-time, data-driven application.

6. **Enforcing Code Quality Standards**: The use of Husky, Prettier, and ESLint helps maintain a consistent and high-quality codebase, which is essential for a project that aims to be scalable and maintainable.

## Conclusion

The Cryptocurrency Order Book App showcases the power of the T3 Stack and the importance of carefully considering the technical choices when building a real-time, data-driven web application. By leveraging TypeScript, React, Next.js, TailwindCSS, tRPC, Prisma, and other supporting libraries, the application demonstrates how to create a scalable, maintainable, and user-friendly cryptocurrency tracking and analysis tool.
