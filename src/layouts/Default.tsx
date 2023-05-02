import Progress from "@/components/Progress";
import { useAppSelector } from "@/stores";

export default function Default({ children }: LayoutProps) {
    const isAnimating = useAppSelector(state => state.appStore.isAnimating)
    const key = useAppSelector(state => state.appStore.key)

    return <div className="pt-16">
        <Progress isAnimating={isAnimating} key={key} />
        {children}
    </div>
}

interface LayoutProps {
    children: Array<JSX.Element>
}