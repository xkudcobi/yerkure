import { CorrelationPanel } from './CorrelationPanel';
import { t } from '@/services/i18n';

export class DisasterCorrelationPanel extends CorrelationPanel {
  constructor() {
    super('disaster-correlation', t('panels.disaster-correlation'), 'disaster', t('components.disasterCorrelation.infoTooltip'));
  }
}
