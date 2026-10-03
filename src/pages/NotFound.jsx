import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';

export function NotFound() {
  return (
    <PageContainer>
      <div className="py-24 text-center max-w-md mx-auto">
        <div className="w-14 h-14 rounded-3xl bg-stone-200/60 flex items-center justify-center mx-auto mb-6 text-stone-600">
          <Compass className="w-7 h-7" />
        </div>
        <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold">
          404 Error
        </span>
        <h1 className="font-serif text-3xl font-medium text-stone-900 mt-2">
          Lost in your world?
        </h1>
        <p className="text-sm text-stone-500 mt-3 leading-relaxed">
          The page you are looking for doesn't exist or has moved.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link to="/">
            <Button variant="primary" size="md" icon={ArrowLeft} iconPosition="left">
              Back Home
            </Button>
          </Link>
          <Link to="/explore">
            <Button variant="outline" size="md">
              Explore Items
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
