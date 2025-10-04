import { ArrowLeft, ExternalLink, Calendar, Clock } from "lucide-react"
import Image from "next/image"
import IntegratedNavbar from "@/components/integrated-navbar"
import Footer from "@/components/footer"
import { apiService } from "@/lib/api"
import { normalizeImagePath } from "@/lib/utils"
import Link from "next/link"

export async function generateStaticParams() {
  try {
    const items = await apiService.getShowcaseItems()
    return items.map((item) => ({ id: String(item.id) }))
  } catch {
    return []
  }
}

export const dynamicParams = false

function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
}

type Props = {
  params: Promise<{ id: string }>
}

export default async function ShowcaseDetailPage(props: Props) {
  const { params } = props
  const { id } = await params
  const idNum = Number(id)
  const showcaseItem = await apiService.getShowcaseItem(idNum)

	if (!showcaseItem) {
		return (
			<div className="min-h-screen bg-white">
				<IntegratedNavbar />
				<div className="flex items-center justify-center min-h-[60vh]">
					<div className="text-center">
						<h3 className="text-xl font-semibold text-gray-900 mb-2">Error</h3>
						<p className="text-gray-600 mb-4">Showcase item not found</p>
						<Link href="/showcase" className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 inline-block">Back to Showcase</Link>
					</div>
				</div>
				<Footer />
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-white">
			<IntegratedNavbar />
			<main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
				<div className="max-w-6xl mx-auto">
					<div className="mb-8">
						<Link href="/showcase" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
							<ArrowLeft className="w-5 h-5" />
							Back to Showcase
						</Link>
					</div>

					<div className="grid lg:grid-cols-2 gap-12 items-start">
						<div className="space-y-6">
							<div className="relative overflow-hidden rounded-2xl shadow-lg">
								<Image
									src={normalizeImagePath(showcaseItem.image)}
									alt={showcaseItem.title}
									width={600}
									height={400}
									className="w-full h-auto object-cover"
									unoptimized={normalizeImagePath(showcaseItem.image).includes('livingtechcreative.com')}
								/>
								<div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
									<a
										href={showcaseItem.url}
										target="_blank"
										rel="noopener noreferrer"
										className="opacity-0 hover:opacity-100 bg-white text-gray-900 px-8 py-4 rounded-lg font-medium flex items-center gap-3 shadow-lg translate-y-4 hover:translate-y-0 transition-all duration-300"
									>
										<span>View Project</span>
										<ExternalLink className="w-5 h-5" />
									</a>
								</div>
							</div>
						</div>

						<div className="space-y-8">
							<div className="space-y-4">
								<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{showcaseItem.title}</h1>
								<p className="text-gray-600 text-lg leading-relaxed">
									This project showcases our expertise in creating innovative digital solutions. 
									We combine cutting-edge technology with creative design to deliver exceptional 
									user experiences that drive results.
								</p>
							</div>

							<div className="space-y-6">
								<h3 className="text-xl font-semibold text-gray-900">Project Details</h3>
								<div className="space-y-4">
									<div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
										<Calendar className="w-5 h-5 text-[#2B35AB]" />
										<div>
											<p className="text-sm text-gray-500">Created</p>
											<p className="font-medium text-gray-900">{formatDate(showcaseItem.created_at)}</p>
										</div>
									</div>
									<div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
										<Clock className="w-5 h-5 text-[#2B35AB]" />
										<div>
											<p className="text-sm text-gray-500">Updated</p>
											<p className="font-medium text-gray-900">{formatDate(showcaseItem.updated_at)}</p>
										</div>
									</div>
									<div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
										<div className="w-5 h-5 bg-[#2B35AB] rounded-full flex items-center justify-center">
											<span className="text-white text-xs font-bold">#</span>
										</div>
										<div>
											<p className="text-sm text-gray-500">Display Order</p>
											<p className="font-medium text-gray-900">{showcaseItem.display_order}</p>
										</div>
									</div>
									<div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
										<div className={`${showcaseItem.is_active ? 'bg-green-500' : 'bg-red-500'} w-3 h-3 rounded-full`}></div>
										<div>
											<p className="text-sm text-gray-500">Status</p>
											<p className="font-medium text-gray-900">{showcaseItem.is_active ? 'Active' : 'Inactive'}</p>
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-col sm:flex-row gap-4">
								<a
									href={showcaseItem.url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex-1 bg-[#2B35AB] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#1f2a8a] transition-colors duration-200 flex items-center justify-center gap-3"
								>
									<span>View Live Project</span>
									<ExternalLink className="w-5 h-5" />
								</a>
								<Link
									href="/showcase"
									className="flex-1 bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 text-center"
								>
									Back to Showcase
								</Link>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	)
}