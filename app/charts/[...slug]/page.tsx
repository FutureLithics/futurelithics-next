"use client";

import React from 'react';
import { useRouter, notFound } from 'next/navigation';
import Bar from '../../_components/pages/charts/bar';
import Line from '../../_components/pages/charts/line';
import Pie from '../../_components/pages/charts/pie';
const chartComponents = (slug: string[]) => {
    if (slug.length === 0) {
        return <div>Not found</div>;
    }

    const chart = slug[0];

    switch (chart) {
        case "bar":
            return <Bar />;
        case "line":
            return <Line />;
        case "pie":
            return <Pie />;
        default:
            return <div>Not found</div>;
    }
}


export default function ServicePage({ params }: { params: { slug?: string[] } }) {
    const router = useRouter();
    const unwrappedParams = React.use(params as any) as { slug?: string[] };
    const slug = unwrappedParams.slug || [];

    const goBack = () => {
        router.back();
    };
    
    return (
        <div className="chart-page bar-chart-container container">
            {chartComponents(slug)}
            <div className="container text-center pt-4">
                <button className="btn btn-info" onClick={goBack}>
                    Go Back
                </button>
            </div>
        </div>
    )

}