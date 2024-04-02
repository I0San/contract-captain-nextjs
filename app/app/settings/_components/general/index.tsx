import styles from '../settings.module.css'
import CardBasic from '@/components/@core/cards/cardBasic'
import StackedListBasic from '@/components/@core/lists/stackedListBasic'
import StackedListBasicItem from '@/components/@core/lists/stackedListBasicItem'

export default function SettingsGeneral() {
	return (
		<CardBasic title={'General'} subtitle={'General application preferences'}>
			<StackedListBasic>
				<StackedListBasicItem>
					<p className={styles.listItemLabel}>App Theme</p>
				</StackedListBasicItem>
			</StackedListBasic>
		</CardBasic>
	)
}