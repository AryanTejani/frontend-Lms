'use client';

import { useTranslations } from 'next-intl';
import { passwordRules } from '../../schemas';
import type { PasswordValidationState, PasswordRuleId } from '../../types';
import { CheckCircleOutlineIcon } from '@/assets/icons';

interface PasswordChecklistProps {
  validation: PasswordValidationState;
}

export function PasswordChecklist({ validation }: PasswordChecklistProps) {
  const t = useTranslations('auth');

  const ruleLabels: Record<string, string> = {
    length: t('ruleLength'),
    case: t('ruleCase'),
    number: t('ruleNumber'),
    symbol: t('ruleSymbol'),
  };

  return (
    <div className="flex flex-col gap-(--space-xs)">
      <span className="body-4-regular text-(--color-text-secondary)">{t('passwordPrompt')}</span>
      <ul className="list-none m-0 p-0 flex flex-col gap-(--space-xs2)">
        {passwordRules.map((rule) => {
          const isValid = validation[rule.id as PasswordRuleId];
          return (
            <li key={rule.id} className="flex items-center gap-(--space-xs)">
              <CheckCircleOutlineIcon
                className={`icon-sm shrink-0 transition-colors ${
                  isValid ? 'text-(--color-text-success)' : 'text-(--color-text-tertiary)'
                }`}
              />
              <span className="body-4-regular">{ruleLabels[rule.id] ?? rule.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
