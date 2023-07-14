<script setup lang="ts">
// import { Project } from 'utils/models';

interface Project {
	name: string;
	description: string;
	version: string;
	stars: number;
	forks: number;
	createdAt: Date | string;
	updatedAt: Date | string;
	videoURL: string;
}

const props = defineProps<Project>()
const emit = defineEmits<{ (event: 'watch'): void }>()

const modifiedIn = useTimeAgo(() => props.updatedAt, {
	messages: {
		invalid: 'Invalid Date',
		past: (n: any) => n.match(/\d/) ? `Updated ${n} ago` : n,
		justNow: 'Recharge',
		future: (n: any) => n.match(/\d/) ? `Update in ${n}` : n,
		year: (n: number) => `${n} year${n > 1 ? 's' : ''}`,
		month: (n: number) => `${n} month${n > 1 ? 's' : ''}`,
		week: (n: number) => `${n} week${n > 1 ? 's' : ''}`,
		day: (n: number) => `${n} day${n > 1 ? 's' : ''}`,
		hour: (n: number) => `${n} hour${n > 1 ? 's' : ''}`,
		minute: (n: number) => `${n} min`,
		second: (n: number) => `${n} sec`,
	}
})
const createdAtFormatted = useDateFormat(props.createdAt, 'DD-MM-YYYY')
</script>
 
<template>
	<div
		class="grow relative mx-auto w-full sm:w-2/5 md:w-[30%] min-w-[328px] max-w-[400px] hover:scale-105 transition-transform">
		<Ribbon :title="modifiedIn" class="absolute top-4 -left-[5px] z-10" />
		<div
			class="relative flex flex-col gap-[10px] rounded-[20px] p-[10px] w-full bg-light-500 dark:bg-dark-600 aspect-[1.215/1] overflow-hidden">
			<div class="relative rounded-[20px] w-full bg-light-600 dark:bg-dark-400 aspect-video overflow-hidden">
				<img v-if="false" src="" alt="" class="w-full h-full">
				<button class="absolute bottom-1 right-2 flex gap-1 items-center text-white" @click="emit('watch')">
					<span class="text-sm">Watch</span>
					<NuxtIcon name="youtube" class="text-[30px]" />
				</button>
			</div>
			<div class="flex-grow grid grid-rows-[min-content_auto] grid-cols-[repeat(2,auto)] gap-y-1 px-1 md:px-2">
				<span class="flex gap-1 lg:gap-2 items-end">
					<h4 class="text-lg whitespace-nowrap font-semi-bold">{{ name }}</h4>
					<span
						class="rounded-full px-[8px] pt-[3px] pb-1 w-fit h-fit text-xs text-center text-black/75 dark:text-white/75 bg-light-600 dark:bg-dark-400">
						{{ version }}
					</span>
				</span>
				<span class="self-end justify-self-end row-start-1 col-start-2 py-1 text-sm whitespace-nowrap">
					{{ createdAtFormatted }}
				</span>
				<p class="row-start-2 col-start-1 col-span-2 text-sm md:text-base opacity-60">{{ description }}</p>
				<button class="absolute bottom-0 right-0 rounded-tl-[20px] px-4 py-[6px] bg-primary-400 text-sm text-white">
					Try Now
				</button>
			</div>
		</div>
	</div>
</template>