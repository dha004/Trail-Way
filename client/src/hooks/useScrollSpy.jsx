import { useEffect, useState } from "react";

export default function useScrollSpy(sectionIds, offset = 0) {
    const [activeId, setActiveId] = useState("");

    useEffect(() => {
        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean);

        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visibleSections.length > 0) {
                    setActiveId(visibleSections[0].target.id);
                }
            },
            {
                root: null,
                rootMargin: `-${offset}px 0px -40% 0px`,
                threshold: 0.3, // reduced from 0.4 to make top section more responsive
            }
        );

        sections.forEach((section) => observer.observe(section));

        // Default to 'home' if near top
        const onScroll = () => {
            if (window.scrollY < 200 && sectionIds.includes("home")) {
                setActiveId("home");
            }
        };

        window.addEventListener("scroll", onScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", onScroll);
        };
    }, [sectionIds, offset]);

    return activeId;
}
